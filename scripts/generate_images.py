#!/usr/bin/env python3
"""Procedural product imagery for the Mayuram Boutique demo.

Renders silk drapes, folded saree stacks, bead/aari embroidery close-ups,
blouses on a dress form and the hero compositions. These are stand-ins:
replace any file in public/images/ with real photography of the same name
(or point src/data/*.ts at new files) and the site picks it up.

Usage: python3 scripts/generate_images.py
"""
import math
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
OUT = os.path.join(ROOT, "public", "images")
TAU = math.tau


# ---------------------------------------------------------------- helpers
def C(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)], np.float32)


def sstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def lerp(a, b, t):
    if np.ndim(t) == 2:
        t = t[..., None]
    return a + (b - a) * t


def noise(H, W, cell, seed, octaves=1):
    r = np.random.default_rng(seed)
    out = np.zeros((H, W), np.float32)
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        c = max(2, int(cell / (2 ** o)))
        g = r.random((H // c + 3, W // c + 3)).astype(np.float32)
        out += np.asarray(Image.fromarray(g, "F").resize((W, H), Image.BICUBIC)) * amp
        tot += amp
        amp *= 0.5
    return out / tot


def norm3(v):
    v = np.asarray(v, np.float32)
    return v / np.linalg.norm(v)


L_DIR = norm3([-0.45, -0.6, 0.75])
H_DIR = norm3(L_DIR + np.array([0, 0, 1], np.float32))
WARM = C("#fff0c8")


def finish(img, seed=0, grain=0.012, vignette=0.32, warm=0.0):
    H, W, _ = img.shape
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    rr = ((x / W - 0.5) ** 2 + (y / H - 0.5) ** 2) * 2
    img = img * (1 - vignette * rr)[..., None]
    if warm:
        img = img + warm * np.array([0.04, 0.02, -0.01], np.float32)
    g = np.random.default_rng(seed + 99).normal(0, grain, (H, W, 1)).astype(np.float32)
    return np.clip(img + g, 0, 1)


def save(img, name, q=82):
    os.makedirs(OUT, exist_ok=True)
    im = Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8))
    im.save(os.path.join(OUT, name + ".webp"), quality=q, method=6)
    if im.width >= 1000:
        im.resize((960, round(im.height * 960 / im.width)), Image.LANCZOS).save(
            os.path.join(OUT, name + "-md.webp"), quality=80, method=6)
    th = im.copy()
    th.thumbnail((360, 360), Image.LANCZOS)
    th.save(os.path.join(OUT, name + "-sm.webp"), quality=78, method=6)
    print("wrote", name, im.size)


def poly_mask(W, H, pts, ss=4):
    m = Image.new("L", (W * ss, H * ss), 0)
    ImageDraw.Draw(m).polygon([(x * W * ss, y * H * ss) for x, y in pts], fill=255)
    return np.asarray(m.resize((W, H), Image.LANCZOS), np.float32) / 255


# ---------------------------------------------------------------- patterns
def butta(u, v, sp, size, kind="flower"):
    row = np.floor(v / sp)
    uu = u + (row % 2) * sp / 2
    lu = (uu % sp) - sp / 2
    lv = (v % sp) - sp / 2
    r = np.hypot(lu, lv)
    th = np.arctan2(lv, lu)
    if kind == "dot":
        return sstep(size + 0.8, size - 0.8, r)
    if kind == "mango":  # paisley-ish teardrop
        rr = np.hypot(lu * 1.25, lv + 0.25 * size * np.sign(lu) * 0.0)
        tail = size * (0.75 + 0.35 * np.cos(th + 0.9))
        m = sstep(tail + 0.8, tail - 0.8, rr)
        hole = sstep(size * 0.3 + 0.8, size * 0.3 - 0.8, np.hypot(lu + size * 0.12, lv + size * 0.08))
        return np.clip(m - hole * 0.8, 0, 1)
    petal = size * (0.5 + 0.5 * np.abs(np.cos(2.5 * th)))
    m = sstep(petal + 0.9, petal - 0.9, r)
    ring = sstep(size * 0.22 + 0.7, size * 0.22 - 0.7, r) * sstep(size * 0.1 - 0.7, size * 0.1 + 0.7, r)
    return np.clip(m - ring * 0.7, 0, 1)


def zari_border(a, s, style="temple", scale=1.0):
    """a: 0..1 across the band, s: px along it. Returns (gold, contrast) masks."""
    inside = sstep(-0.01, 0.0, a) * sstep(1.01, 1.0, a)
    aa = 0.012
    def band(a0, a1):
        return sstep(a0 - aa, a0, a) * sstep(a1 + aa, a1, a)
    gold = band(0.0, 0.035) + band(0.06, 0.075) + band(0.6, 0.63) + band(0.94, 0.975)
    contrast = band(0.66, 0.93) + band(0.0, 1.0) * 0
    main = band(0.1, 0.57)
    b = np.clip((a - 0.1) / 0.47, 0, 1)
    P = 46 * scale
    if style == "temple":
        tri = np.abs(((s / P) % 1) - 0.5) * 2
        motif = sstep(tri * 0.85 - 0.04, tri * 0.85, 1 - b)
        inner = np.abs(((s / (P / 4)) % 1) - 0.5) < 0.18
        gold = gold + main * (motif * 0.95 + (1 - motif) * 0.35 * inner)
        contrast = contrast + main * (1 - motif) * (1 - 0.35 * inner)
    elif style == "rudraksha":
        cs = (s % P) - P / 2
        cb = (b - 0.5) * 0.47 / 0.47 * P * 0.95
        r = np.hypot(cs, cb)
        dot = sstep(P * 0.36, P * 0.32, r) - 0.6 * sstep(P * 0.18, P * 0.14, r)
        gold = gold + main * (0.55 + 0.45 * dot)
    else:  # solid woven zari
        gold = gold + main
    stripes = 0.85 + 0.15 * np.sin(s * 1.9)
    ctr_dots = band(0.66, 0.93) * butta(s, a * 120, 22 * scale, 3.2 * scale, "dot")
    gold = np.clip(gold * stripes + ctr_dots, 0, 1) * inside
    contrast = np.clip(contrast, 0, 1) * inside
    return gold, contrast


def floral_print(u, v, sp, seed):
    r = np.random.default_rng(seed)
    out = np.zeros_like(u)
    for k in range(3):
        off = r.random(2) * sp
        s = sp * (0.8 + 0.5 * r.random())
        lu = ((u + off[0]) % s) - s / 2
        lv = ((v + off[1] + k * 13) % s) - s / 2
        rr = np.hypot(lu, lv)
        th = np.arctan2(lv, lu) + k
        petal = s * 0.18 * (0.55 + 0.45 * np.abs(np.cos(2.5 * th)))
        out = np.maximum(out, sstep(petal + 1, petal - 1, rr) * (0.6 + 0.4 * k / 2))
    return out


# ---------------------------------------------------------------- shading core
def shade(albedo, metal, nrm, ao, gold, sheen=0.55, spec_exp=18, shot=None, fres_amt=0.7,
          matte=False, sparkle=None):
    nx, ny, nz = nrm[..., 0], nrm[..., 1], nrm[..., 2]
    ndl = np.clip(nx * L_DIR[0] + ny * L_DIR[1] + nz * L_DIR[2], 0, 1)
    ndh = np.clip(nx * H_DIR[0] + ny * H_DIR[1] + nz * H_DIR[2], 0, 1)
    fres = np.clip((1 - nz) * 2.6, 0, 1)
    base = albedo
    if shot is not None:
        base = lerp(albedo, shot, fres * fres_amt * (1 - metal))
    if matte:
        diel = base * (0.3 + 0.8 * ndl[..., None]) * ao[..., None]
        diel += (ndh ** 4 * 0.05)[..., None]
    else:
        diel = base * (0.16 + 0.95 * ndl[..., None]) * ao[..., None]
        diel += (ndh ** spec_exp * sheen)[..., None] * (0.55 * base + 0.45)
    met = gold * (0.22 + 1.0 * ndl[..., None]) * ao[..., None] + (ndh ** 11 * 1.05)[..., None] * C("#ffe6a2")
    if sparkle is not None:
        met += (sparkle * ndl)[..., None] * 0.6
    return lerp(diel, met, metal)


def heightfield(H, W, seed, folds=5, gather=0.25, tilt=0.0, amp=1.0, terms=4, wobble=1.0):
    r = np.random.default_rng(seed)
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    xn, yn = x / W, y / H
    xs = (xn - 0.5) * (1 - gather * (1 - yn)) + 0.5 + tilt * (yn - 0.5)
    n1 = noise(H, W, 220, seed + 1)
    h = np.zeros((H, W), np.float32)
    for k in range(terms):
        f = folds * (0.55 + 0.9 * r.random()) * (1 + k * 0.7)
        h += (1 / (1 + k * 0.9)) * np.sin(TAU * f * xs + r.random() * TAU
                                           + wobble * 2.2 * (n1 - 0.5) + r.uniform(-1.5, 1.5) * yn)
    h /= np.abs(h).max() + 1e-6
    h = np.sign(h) * np.abs(h) ** 0.8
    hpx = h * amp * (W / max(folds, 1)) * 0.2
    gy, gx = np.gradient(hpx)
    nrm = np.dstack([-gx, -gy, np.ones_like(gx)])
    nrm /= np.linalg.norm(nrm, axis=2, keepdims=True)
    ao = 0.55 + 0.45 * sstep(-1, 1, h)
    return xs, y, hpx, nrm, ao


# ---------------------------------------------------------------- renderers
def drape(W, H, pal, seed=0, folds=5, amp=1.0, gather=0.25, tilt=0.0, zoom=1.0,
          border=(0.66, 0.24), border_style="temple", butta_kind="flower", butta_sp=64,
          butta_size=10, kind="silk", print_col=None, second_border=None, dof=0.0):
    xs, y, hpx, nrm, ao = heightfield(H, W, seed, folds, gather, tilt, amp)
    u = (xs * W + hpx * 0.45) / zoom
    v = y / zoom
    frac = xs + hpx * 0.45 / W
    albedo = np.broadcast_to(C(pal["body"]), (H, W, 3)).copy()
    metal = np.zeros((H, W), np.float32)
    contrast = np.zeros((H, W), np.float32)
    borders = [border] if border else []
    if second_border:
        borders.append(second_border)
    for (bpos, bw) in borders:
        a = (frac - bpos) / bw
        g, c = zari_border(a, v, border_style, 1 / zoom)
        metal = np.maximum(metal, g)
        contrast = np.maximum(contrast, c)
    body_region = 1 - np.clip(contrast + metal, 0, 1)
    for (bpos, bw) in borders:
        body_region *= 1 - sstep(bpos - 0.01, bpos, frac) * sstep(bpos + bw + 0.01, bpos + bw, frac)
    if print_col:
        pm = floral_print(u, v, 90, seed) * body_region
        albedo = lerp(albedo, C(print_col), pm * 0.9)
    if butta_kind:
        bm = butta(u, v, butta_sp, butta_size, butta_kind) * body_region
        if kind == "cotton":
            albedo = lerp(albedo, C(pal.get("thread", pal["border"])), bm)
        else:
            metal = np.maximum(metal, bm)
    if pal.get("border"):
        albedo = lerp(albedo, C(pal["border"]), contrast)
    if kind == "cotton":
        ch = (np.sin(u * TAU / 26) > 0.82) | (np.sin(v * TAU / 26) > 0.82)
        albedo = lerp(albedo, albedo * 0.86, ch.astype(np.float32) * body_region)
    sparkle = (noise(H, W, 3, seed + 5) > 0.91).astype(np.float32) * 0.5
    img = shade(albedo, metal, nrm, ao, C(pal.get("gold", "#d7a630")),
                sheen={"silk": 0.6, "chiffon": 0.25, "organza": 0.45, "cotton": 0.0}[kind],
                spec_exp={"silk": 18, "chiffon": 6, "organza": 10, "cotton": 4}[kind],
                shot=C(pal["shot"]) if pal.get("shot") else None,
                matte=(kind == "cotton"), sparkle=sparkle)
    if kind in ("chiffon", "organza"):
        img = lerp(img, img * 0.75 + 0.22 * C(pal["body"]) + 0.06, 0.45)
    weave = 1 + (0.05 if kind == "cotton" else 0.025) * np.sin(u * 2.7) * np.sin(v * 2.7)
    img = img * weave[..., None]
    if dof:
        blur = np.asarray(Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8))
                          .filter(ImageFilter.GaussianBlur(dof)), np.float32) / 255
        yn = y / H
        img = lerp(img, blur, sstep(0.25, 0.0, yn) + sstep(0.72, 1.0, yn))
    return img


def bg_studio(W, H, tone="ivory", seed=0):
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    xn, yn = x / W, y / H
    spot = np.exp(-(((xn - 0.42) / 0.55) ** 2 + ((yn - 0.3) / 0.6) ** 2))
    if tone == "ivory":
        top, bot = C("#f7f0e3"), C("#e3d3b8")
    elif tone == "blush":
        top, bot = C("#f5e6e0"), C("#dcc0b6")
    else:
        top, bot = C("#3a1440"), C("#12051a")
    img = lerp(np.broadcast_to(top, (H, W, 3)), np.broadcast_to(bot, (H, W, 3)), sstep(0.0, 1.0, yn))
    img = img * (0.8 + 0.3 * spot[..., None])
    img += (noise(H, W, 40, seed) - 0.5)[..., None] * 0.02
    return img


def capsule(px, py, hw, R):
    qx = np.maximum(np.abs(px) - (hw - R), 0)
    return np.hypot(qx, py) - R, qx * np.sign(px), py


def stack(W, H, layers, bg="ivory", seed=0, scale=1.0, cx=0.5, base=0.84, canvas=None):
    r = np.random.default_rng(seed)
    img = canvas.copy() if canvas is not None else bg_studio(W, H, bg, seed)
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    ws = min(W, H * 0.85) * 0.86 * scale
    t = H * 0.068 * scale
    d = H * 0.25 * scale
    # contact shadow
    sh = np.exp(-(((x - W * cx) / (ws * 0.62)) ** 2 + ((y - H * base - t * 0.15) / (t * 0.55)) ** 2))
    img *= (1 - 0.55 * sh)[..., None]
    n = len(layers)
    for i, pal in enumerate(layers):
        top = i == n - 1
        ox = r.uniform(-0.018, 0.018) * W
        hw = ws / 2 * r.uniform(0.97, 1.02)
        yf = H * base - (i + 1) * t * 0.94
        ccx = W * cx + ox
        px, py = x - ccx, y - (yf + t / 2)
        # shadow cast by this layer onto the one below
        sd, _, _ = capsule(px, py - t * 0.3, hw * 1.01, t / 2)
        img *= (1 - 0.35 * sstep(t * 0.4, -t * 0.2, sd))[..., None]
        if top:
            back_hw = hw * 0.88
            pts = [((ccx - hw + t * 0.45) / W, (yf + t * 0.05) / H), ((ccx + hw - t * 0.45) / W, (yf + t * 0.05) / H),
                   ((ccx + back_hw - t * 0.3) / W, (yf - d) / H), ((ccx - back_hw + t * 0.3) / W, (yf - d) / H)]
            m = poly_mask(W, H, pts)
            vt = np.clip((yf - y) / d, 0, 1)
            wt = hw + (back_hw - hw) * vt
            ut = (x - ccx) / wt * hw + hw
            vf = vt * d * 2.3
            wr = noise(H, W, 70, seed + i) - 0.5
            nrm = np.dstack([wr * 0.25, -0.75 + wr * 0.2, np.full_like(wr, 0.65)])
            nrm /= np.linalg.norm(nrm, axis=2, keepdims=True)
            alb = np.broadcast_to(C(pal["body"]), (H, W, 3)).copy()
            g1, c1 = zari_border(vf / (d * 0.55), ut, pal.get("style", "temple"), 0.9)
            bm = butta(ut, vf, 46, 7, pal.get("butta", "flower")) * (1 - sstep(-0.02, 0.02, 0.98 - vf / (d * 0.55)))
            metal = np.clip(g1 + bm, 0, 1)
            alb = lerp(alb, C(pal["border"]), c1)
            ao = 0.82 + 0.18 * (1 - vt)
            col = shade(alb, metal, nrm, ao, C(pal.get("gold", "#d7a630")), shot=C(pal["shot"]),
                        sheen=0.4, matte=pal.get("matte", False))
            img = lerp(img, col, m)
        sd, qx, qy = capsule(px, py, hw, t / 2)
        m = sstep(0.8, -0.8, sd)
        qxn, qyn = qx / (t / 2), qy / (t / 2)
        nz = np.sqrt(np.clip(1 - qxn ** 2 - qyn ** 2, 0, 1))
        wr = noise(H, W, 30, seed + 10 + i) - 0.5
        nrm = np.dstack([qxn * 0.8 + wr * 0.3, qyn * 0.7 + wr * 0.15, nz + 0.35])
        nrm /= np.linalg.norm(nrm, axis=2, keepdims=True)
        s = np.clip((y - yf) / t, 0, 1)
        alb = np.broadcast_to(C(pal["body"]), (H, W, 3)).copy()
        g, c = zari_border(s * 1.02 - 0.01, x - ccx + 500, pal.get("style", "temple"), 0.8)
        alb = lerp(alb, C(pal["border"]), c)
        ao = 0.82 + 0.18 * np.clip(nz, 0, 1)
        col = shade(alb, g, nrm, ao, C(pal.get("gold", "#d7a630")), shot=C(pal["shot"]),
                    sheen=0.5, matte=pal.get("matte", False))
        img = lerp(img, col, m)
    return img


# ---------------------------------------------------------------- embroidery
class Beads:
    def __init__(self, img):
        self.img = img
        self.H, self.W, _ = img.shape

    def bead(self, x, y, r, kind="gold", col=None):
        img = self.img
        R = int(r * 1.6) + 3
        x0, x1 = max(int(x) - R, 0), min(int(x) + R + 1, self.W)
        y0, y1 = max(int(y) - R, 0), min(int(y) + R + 1, self.H)
        if x0 >= x1 or y0 >= y1:
            return
        Y, X = np.mgrid[y0:y1, x0:x1].astype(np.float32)
        # soft shadow
        sd = np.hypot(X - x - r * 0.3, Y - y - r * 0.4) / (r * 1.15)
        img[y0:y1, x0:x1] *= (1 - 0.45 * sstep(1.0, 0.4, sd))[..., None]
        dx, dy = (X - x) / r, (Y - y) / r
        d = np.sqrt(dx * dx + dy * dy)
        m = sstep(1.0, 1 - 1.4 / max(r, 1), d)
        if kind == "sequin":
            dx, dy = dx * 0.3, dy * 0.3
        nz = np.sqrt(np.clip(1 - dx * dx - dy * dy, 0, 1))
        ndl = np.clip(dx * L_DIR[0] + dy * L_DIR[1] + nz * L_DIR[2], 0, 1)
        ndh = np.clip(dx * H_DIR[0] + dy * H_DIR[1] + nz * H_DIR[2], 0, 1)
        col = C(col) if isinstance(col, str) else col
        if kind == "gold":
            c = (col if col is not None else C("#d9a42b")) * (0.25 + 0.95 * ndl[..., None]) + (ndh ** 22)[..., None] * WARM * 1.1
        elif kind == "pearl":
            c = C("#f3ece0") * (0.4 + 0.65 * ndl[..., None]) + (ndh ** 30)[..., None] * 0.9
            c += (np.clip(1 - nz, 0, 1) * 0.08)[..., None] * C("#c8a0ff")
        elif kind == "stone":
            rim = sstep(0.72, 0.82, d)
            c = col * (0.18 + 0.55 * ndl[..., None]) + (ndh ** 60)[..., None] * 1.3
            c += (np.clip(nz - 0.5, 0, 1) * 0.35)[..., None] * col
            c = lerp(c, C("#d9a42b") * (0.3 + 0.9 * ndl[..., None]) + (ndh ** 14)[..., None] * WARM, rim)
        else:  # sequin
            c = (col if col is not None else C("#d9a42b")) * (0.35 + 0.6 * ndl[..., None]) + (ndh ** 9)[..., None] * WARM * 1.2
            c = lerp(c, c * 0.3, sstep(0.22, 0.14, d))
        img[y0:y1, x0:x1] = lerp(img[y0:y1, x0:x1], c, m)

    def chain(self, pts, r, kind="gold", col=None, gap=1.9):
        pts = np.asarray(pts, np.float32)
        seg = np.hypot(*np.diff(pts, axis=0).T)
        cum = np.concatenate([[0], np.cumsum(seg)])
        if cum[-1] <= 0:
            return
        n = max(int(cum[-1] / (r * gap)), 1)
        for s in np.linspace(0, cum[-1], n):
            xx = np.interp(s, cum, pts[:, 0])
            yy = np.interp(s, cum, pts[:, 1])
            self.bead(xx, yy, r, kind, col)

    def ring(self, cx, cy, R, r, kind="gold", col=None, gap=2.1):
        n = max(int(TAU * R / (r * gap)), 3)
        for k in range(n):
            a = TAU * k / n
            self.bead(cx + R * math.cos(a), cy + R * math.sin(a), r, kind, col)

    def mandala(self, cx, cy, S=1.0, stone="#b3122e", stone2="#0f7a4a", petals=8):
        self.bead(cx, cy, 13 * S, "stone", stone)
        self.ring(cx, cy, 22 * S, 3.6 * S, "pearl")
        self.ring(cx, cy, 30 * S, 2.2 * S, "gold", gap=1.8)
        for k in range(petals):
            a0 = TAU * k / petals
            pts = []
            for tt in np.linspace(-1, 1, 40):
                rho = 34 * S + 46 * S * (1 - tt * tt) ** 0.6
                ang = a0 + tt * (TAU / petals) * 0.42
                pts.append((cx + rho * math.cos(ang), cy + rho * math.sin(ang)))
            self.chain(pts, 2.3 * S, "gold", gap=1.75)
            self.bead(cx + 58 * S * math.cos(a0), cy + 58 * S * math.sin(a0), 6 * S, "sequin")
            self.bead(cx + 45 * S * math.cos(a0), cy + 45 * S * math.sin(a0), 3.4 * S, "stone", stone2)
            am = a0 + TAU / petals / 2
            self.bead(cx + 72 * S * math.cos(am), cy + 72 * S * math.sin(am), 3 * S, "pearl")
        self.ring(cx, cy, 92 * S, 2.6 * S, "gold", gap=1.9)
        self.ring(cx, cy, 102 * S, 3.6 * S, "pearl", gap=2.3)
        for k in range(petals * 2):
            a = TAU * (k + 0.5) / (petals * 2)
            self.bead(cx + 114 * S * math.cos(a), cy + 114 * S * math.sin(a), 4.6 * S, "sequin")

    def vine(self, x0, x1, yc, amp, S=1.0, stone="#b3122e", seed=0):
        r = np.random.default_rng(seed)
        xs = np.linspace(x0, x1, 300)
        ys = yc + amp * np.sin((xs - x0) / 70 * S ** -1)
        self.chain(np.c_[xs, ys], 1.7 * S, "gold", gap=1.6)
        for k, xx in enumerate(np.arange(x0 + 35, x1, 70 * S)):
            yy = yc + amp * math.sin((xx - x0) / 70 / S)
            side = 1 if k % 2 else -1
            pts = [(xx + 26 * S * tt, yy + side * 22 * S * math.sin(tt * math.pi) - side * 4 * tt * S) for tt in np.linspace(0, 1, 18)]
            pts2 = [(xx + 26 * S * tt, yy + side * 6 * S * math.sin(tt * math.pi)) for tt in np.linspace(0, 1, 18)]
            self.chain(pts, 1.5 * S, "gold", gap=1.7)
            self.chain(pts2, 1.5 * S, "gold", gap=1.7)
            self.bead(xx, yy - side * 18 * S, 4.2 * S, "stone", stone if r.random() > 0.4 else "#0f7a4a")
            self.ring(xx, yy - side * 18 * S, 8 * S, 1.6 * S, "pearl", gap=2.0)


def embroidery(W, H, pal, seed=0, layout="mandala", S=1.0, stone="#b3122e"):
    base = drape(W, H, pal, seed=seed, folds=2, amp=0.35, gather=0.0, border=None, butta_kind=None)
    b = Beads(base)
    if layout == "mandala":
        b.mandala(W * 0.5, H * 0.5, S * W / 420, stone)
        for cx, cy in [(0, 0), (W, 0), (0, H), (W, H)]:
            b.mandala(cx, cy, S * W / 640, stone)
    elif layout == "vines":
        for i, yy in enumerate(np.arange(H * 0.12, H, H * 0.26)):
            b.vine(-20, W + 20, yy, 18 * S, S * W / 700, stone, seed + i)
    elif layout == "border":
        b.vine(-20, W + 20, H * 0.22, 14 * S, S * W / 700, stone, seed)
        for k in range(3):
            b.chain([(-10, H * (0.36 + k * 0.035)), (W + 10, H * (0.36 + k * 0.035))], 2.4 * S * W / 700,
                    ["gold", "pearl", "gold"][k], gap=1.9)
        for xx in np.arange(30, W, 110 * S * W / 700):
            b.mandala(xx, H * 0.66, S * W / 1500, stone, petals=6)
    return finish(b.img, seed)


# ---------------------------------------------------------------- blouse on dress form
def blouse(W, H, pal, seed=0, heavy=True, stitch=False, stone="#b3122e", bg="plum", canvas=None, ox=0.0, sc=1.0):
    img = canvas.copy() if canvas is not None else bg_studio(W, H, bg, seed)
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)

    kx = 0.8 * H / W  # silhouette is drawn for a 4:5 frame; keep proportions on other aspects

    def T(pts):
        return [((px - 0.5) * sc * kx + 0.5 + ox, (py - 0.5) * sc + 0.5) for px, py in pts]

    # dress form torso
    torso = T([(0.44, 0.02), (0.56, 0.02), (0.57, 0.17), (0.80, 0.23), (0.84, 0.30), (0.75, 0.52), (0.71, 0.78),
               (0.74, 1.02), (0.26, 1.02), (0.29, 0.78), (0.25, 0.52), (0.16, 0.30), (0.20, 0.23), (0.43, 0.17)])
    tm = poly_mask(W, H, torso)
    cxp = (x / W - 0.5 - ox) / (0.3 * sc * kx)
    cyl = np.sqrt(np.clip(1 - cxp ** 2, 0, 1))
    form_col = C("#2a2028") if bg == "ivory" else C("#cdbfa8")
    lit = (0.25 + 0.85 * cyl ** 0.7)[..., None] * (1 - 0.25 * (y / H))[..., None]
    linen = form_col * lit + (noise(H, W, 5, seed) - 0.5)[..., None] * 0.035
    linen += (np.clip(1 - np.abs(cxp + 0.35) / 0.12, 0, 1) ** 2 * 0.12)[..., None]
    img = lerp(img, linen, tm)
    # blouse silhouette with a deep U back
    a, bb, ny = 0.125, 0.33, 0.2
    U = [(0.5 + a * math.cos(t), ny + bb * math.sin(t)) for t in np.linspace(0, math.pi, 60)]
    outer = [(0.13, 0.43), (0.19, 0.25), (0.35, 0.205)] + [(0.5 + a + 0.0, ny)] * 0
    outline = ([(0.13, 0.43), (0.19, 0.245), (0.37, 0.2)] + U[::-1] +
               [(0.63, 0.2), (0.81, 0.245), (0.87, 0.43), (0.75, 0.46), (0.72, 0.42), (0.705, 0.74),
                (0.5, 0.765), (0.295, 0.74), (0.28, 0.42), (0.25, 0.46)])
    # U drawn reversed goes from left to right through the bottom — fix the order
    U_lr = [(0.5 - a * math.cos(t), ny + bb * math.sin(t)) for t in np.linspace(0, math.pi, 60)]
    outline = ([(0.13, 0.43), (0.19, 0.245), (0.37, 0.2)] + U_lr +
               [(0.63, 0.2), (0.81, 0.245), (0.87, 0.43), (0.75, 0.46), (0.72, 0.42), (0.705, 0.74),
                (0.5, 0.765), (0.295, 0.74), (0.28, 0.42), (0.25, 0.46)])
    bm = poly_mask(W, H, T(outline))
    fab = drape(W, H, pal, seed=seed + 3, folds=3, amp=0.16, gather=0.0, border=None,
                butta_kind="dot" if not stitch else None, butta_sp=34, butta_size=2.2)
    body = np.clip(cyl, 0, 1)[..., None] ** 0.6
    fab = fab * (0.3 + 0.8 * body)
    img = lerp(img, fab, bm)
    # neck shadow inside U
    img = img * (1 - 0.0 * bm)[..., None]
    beads = Beads(img)
    s = H / 1000 * sc

    def P(px, py):
        q = T([(px, py)])[0]
        return q[0] * W, q[1] * H

    def Uline(off, t0=0.0, t1=math.pi, n=120):
        return [P(0.5 - (a + off) * math.cos(t), ny + (bb + off * 1.4) * math.sin(t)) for t in np.linspace(t0, t1, n)]

    if stitch:
        def dashes(pts):
            pts = np.asarray(pts)
            for i in range(0, len(pts) - 1, 2):
                beads.chain(pts[i:i + 2], 1.1 * s, "pearl", gap=1.4)
        dashes(Uline(0.012, n=160))
        dashes([P(0.3, 0.725 - 0.0) for _ in [0]] + [P(0.3 + 0.4 * k / 80, 0.735 + 0.012 * math.sin(k / 80 * math.pi)) for k in range(81)])
        for side in (-1, 1):
            dashes([P(0.5 + side * (0.17 - 0.03 * k / 60), 0.42 + 0.3 * k / 60) for k in range(61)])
        # chalk marks
        for k in range(6):
            beads.chain([P(0.36 + k * 0.055, 0.6), P(0.36 + k * 0.055, 0.62)], 0.9 * s, "pearl", gap=1.2)
        # pins
        for px, py in [(0.33, 0.45), (0.67, 0.47), (0.5, 0.71)]:
            X0, Y0 = P(px, py)
            beads.chain([(X0, Y0), (X0 + 22 * s, Y0 - 14 * s)], 0.8 * s, "pearl", gap=1.0)
            beads.bead(X0, Y0, 4.5 * s, "stone", "#c4163a")
    else:
        beads.chain(Uline(0.006), 3.0 * s, "gold", gap=1.85)
        beads.chain(Uline(0.022), 2.4 * s, "pearl", gap=2.0)
        if heavy:
            beads.chain(Uline(0.04), 2.0 * s, "gold", gap=1.7)
            for t in np.linspace(0.08, math.pi - 0.08, 22):
                X0, Y0 = P(0.5 - (a + 0.058) * math.cos(t), ny + (bb + 0.081) * math.sin(t))
                beads.bead(X0, Y0, 5.2 * s, "stone", stone if int(t * 10) % 2 else "#0f7a4a")
            cx0, cy0 = P(0.5, 0.67)
            beads.mandala(cx0, cy0, 0.42 * s, stone)
        # sleeve hems and waistband
        for side in (-1, 1):
            p0, p1 = (0.5 + side * 0.37, 0.43), (0.5 + side * 0.25, 0.46)
            beads.chain([P(*p0), P(*p1)], 2.6 * s, "gold", gap=1.8)
            beads.chain([P(p0[0] - side * 0.003, p0[1] - 0.015), P(p1[0] - side * 0.003, p1[1] - 0.015)], 2.0 * s, "pearl", gap=2.0)
        beads.chain([P(0.3 + 0.4 * k / 60, 0.738 + 0.012 * math.sin(k / 60 * math.pi)) for k in range(61)], 2.6 * s, "gold", gap=1.8)
        # latkans
        for side in (-1, 1):
            X0, Y0 = P(0.5 + side * 0.03, 0.75)
            for k in range(14):
                beads.bead(X0 + side * k * 1.6 * s, Y0 + k * 5.5 * s, 1.6 * s, "gold")
            X1, Y1 = X0 + side * 22 * s, Y0 + 77 * s
            beads.bead(X1, Y1, 7 * s, "stone", stone)
            for k in range(7):
                beads.chain([(X1 - 7 * s + k * 2.3 * s, Y1 + 6 * s), (X1 - 9 * s + k * 3 * s, Y1 + 34 * s)], 1.2 * s, "gold", gap=1.5)
    return beads.img


# ---------------------------------------------------------------- hero interior
def interior(W, H, seed=0, glow=(0.72, 0.42), warm="#5a254e"):
    r = np.random.default_rng(seed)
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    xn, yn = x / W, y / H
    g = np.exp(-(((xn - glow[0]) / 0.5) ** 2 + ((yn - glow[1]) / 0.65) ** 2))
    img = lerp(np.broadcast_to(C("#12041a"), (H, W, 3)), np.broadcast_to(C(warm), (H, W, 3)), g * 0.85)
    img += (g ** 3)[..., None] * C("#562a23") * 0.5
    # carved arches (two receding colonnades)
    arch = Image.new("L", (W, H), 0)
    dr = ImageDraw.Draw(arch)
    for k, (cx, w, top, val) in enumerate([(0.73, 0.36, 0.06, 60), (0.73, 0.26, 0.2, 36)]):
        X0, X1 = (cx - w / 2) * W, (cx + w / 2) * W
        pw = w * W * 0.11
        for px in (X0, X1 - pw):
            dr.rectangle([px, top * H + w * W * 0.3, px + pw, H], fill=val)
            for j in range(10):
                yy = top * H + w * W * 0.35 + j * (H * 0.08)
                dr.rectangle([px - 4, yy, px + pw + 4, yy + 6], fill=val + 30)
        # cusped (multifoil) arch head
        ac = ((X0 + X1) / 2, top * H + w * W * 0.32)
        R = (X1 - X0) / 2
        for j in range(7):
            ang = math.pi + math.pi * j / 6
            rx, ry = ac[0] + R * 0.82 * math.cos(ang), ac[1] + R * 0.82 * math.sin(ang)
            dr.ellipse([rx - R * 0.22, ry - R * 0.22, rx + R * 0.22, ry + R * 0.22], outline=val + 20, width=max(int(W / 300), 3))
        dr.arc([ac[0] - R, ac[1] - R, ac[0] + R, ac[1] + R], 180, 360, fill=val + 40, width=max(int(W / 160), 6))
    archf = np.asarray(arch.filter(ImageFilter.GaussianBlur(W / 600)), np.float32) / 255
    archf = np.asarray(Image.fromarray((archf * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(W / 900)), np.float32) / 255
    img = img + archf[..., None] * C("#965c22") * (0.18 + 0.55 * g[..., None])
    # bokeh
    bk = np.zeros((H, W), np.float32)
    bimg = Image.new("L", (W, H), 0)
    bd = ImageDraw.Draw(bimg)
    for _ in range(46):
        bx, by = r.uniform(0.35, 1.0) * W, r.uniform(0.0, 0.75) * H
        br = r.uniform(0.006, 0.022) * W
        bd.ellipse([bx - br, by - br, bx + br, by + br], fill=int(r.uniform(40, 130)))
    bk = np.asarray(bimg.filter(ImageFilter.GaussianBlur(W / 500)), np.float32) / 255
    img += bk[..., None] * C("#dba01c") * 0.55
    img += (noise(H, W, 60, seed) - 0.5)[..., None] * 0.03
    return np.clip(img, 0, 1)


def lamp(img, cx, base_y, h, seed=0):
    """Kuthu vilakku (brass oil lamp) with lit wicks."""
    H, W, _ = img.shape
    m = Image.new("L", (W * 2, H * 2), 0)
    d = ImageDraw.Draw(m)
    S = 2
    def E(x, y, rx, ry):
        d.ellipse([(x - rx) * S, (y - ry) * S, (x + rx) * S, (y + ry) * S], fill=255)
    w = h * 0.28
    E(cx, base_y, w, w * 0.18)
    d.polygon([((cx - w) * S, base_y * S), ((cx + w) * S, base_y * S), ((cx + w * 0.3) * S, (base_y - h * 0.1) * S), ((cx - w * 0.3) * S, (base_y - h * 0.1) * S)], fill=255)
    d.rectangle([(cx - w * 0.07) * S, (base_y - h * 0.8) * S, (cx + w * 0.07) * S, base_y * S], fill=255)
    for k in range(4):
        yy = base_y - h * (0.2 + k * 0.17)
        E(cx, yy, w * 0.16, w * 0.07)
    bowl_y = base_y - h * 0.8
    d.chord([(cx - w * 0.8) * S, (bowl_y - w * 0.3) * S, (cx + w * 0.8) * S, (bowl_y + w * 0.3) * S], 0, 180, fill=255)
    d.rectangle([(cx - w * 0.05) * S, (bowl_y - h * 0.18) * S, (cx + w * 0.05) * S, bowl_y * S], fill=255)
    E(cx, bowl_y - h * 0.2, w * 0.12, w * 0.16)
    mm = np.asarray(m.resize((W, H), Image.LANCZOS), np.float32) / 255
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    sh = np.clip(1 - np.abs((x - cx + w * 0.25) / (w * 0.9)), 0, 1)
    brass = C("#7a4a12") * (0.35 + 1.1 * sh[..., None] ** 2) + (sh ** 18)[..., None] * C("#ffe2a0")
    img = lerp(img, brass, mm)
    for k in (-1, -0.5, 0, 0.5, 1):
        fx, fy = cx + k * w * 0.72, bowl_y - w * 0.12 - (1 - abs(k)) * w * 0.05
        rr = np.hypot((x - fx) / (w * 0.06), (y - fy) / (w * 0.16))
        flame = np.exp(-rr ** 2 * 1.5)
        glow = np.exp(-((x - fx) ** 2 + (y - fy) ** 2) / (2 * (w * 0.9) ** 2))
        img = img + flame[..., None] * C("#fff1b0") * 1.2 + glow[..., None] * C("#c9741a") * 0.18
    return np.clip(img, 0, 1)


def hero(W, H, kind, seed):
    img = interior(W, H, seed, warm={"stack": "#5a254e", "blouse": "#4a1a52", "bridal": "#5a1a2a"}[kind])
    if kind == "stack":
        layers = [PAL["green_pink"], PAL["mustard"], PAL["peacock"], PAL["purple"], PAL["purple2"]]
        img = stack(W, H, layers, seed=seed, scale=0.95, cx=0.72, base=0.9, canvas=img)
    elif kind == "blouse":
        img = blouse(W, H, PAL["rani"], seed=seed, canvas=img, ox=0.22, sc=0.92)
    else:
        dr = drape(W, H, PAL["maroon"], seed=seed + 4, folds=11, amp=1.0, gather=0.5,
                   border=(0.86, 0.14), border_style="temple", butta_sp=58, butta_size=9)
        y, x = np.mgrid[0:H, 0:W].astype(np.float32)
        xn, yn = x / W, y / H
        edge = 0.5 + 0.04 * np.sin(yn * 9) - 0.08 * yn
        m = sstep(edge - 0.01, edge + 0.04, xn) * sstep(1.02, 0.97, yn)
        img = lerp(img, dr, m)
    img = lamp(img, W * 0.42, H * 0.97, H * 0.5, seed)
    return finish(img, seed, vignette=0.25)


# ---------------------------------------------------------------- palettes
PAL = {
    "purple": dict(body="#3f1250", shot="#86246c", border="#b0286a", gold="#d9a62e"),
    "purple2": dict(body="#4c1a5e", shot="#7a2a7a", border="#2a0a38", gold="#dba01c", style="rudraksha"),
    "maroon": dict(body="#6e0c1a", shot="#a8182c", border="#2c5a2a", gold="#dcaa34"),
    "green_pink": dict(body="#0e4a36", shot="#1f6b4a", border="#c02a5a", gold="#d6a432"),
    "peacock": dict(body="#0b3a66", shot="#0e7088", border="#5a1a5a", gold="#d9a62e", style="rudraksha"),
    "mustard": dict(body="#b8800f", shot="#dca528", border="#6e0f2a", gold="#e8c060"),
    "rani": dict(body="#a30e52", shot="#d8307a", border="#3a0e5a", gold="#dcaa34"),
    "ivory": dict(body="#ede2c8", shot="#f6eedc", border="#7a1424", gold="#c99a2e", thread="#7a1424"),
    "teal": dict(body="#1f7a7e", shot="#3aa0a0", border="#0e4a50", gold="#d9b04a"),
    "lavender": dict(body="#9c84c4", shot="#c0a8e0", border="#5a3a8a", gold="#d9b04a"),
    "black": dict(body="#14101a", shot="#3a2a4a", border="#2a1a30", gold="#dba01c"),
    "orange": dict(body="#c8501a", shot="#e87a2a", border="#0e5a3a", gold="#e0b040"),
    "mint": dict(body="#b8d4c0", shot="#d8ece0", border="#3a6a5a", gold="#c9a040", thread="#3a6a5a"),
    "wine": dict(body="#4a0c24", shot="#7a1a3e", border="#1a3a5a", gold="#dba01c"),
    "bottle": dict(body="#0c3a2a", shot="#1a5a3e", border="#6e0f2a", gold="#dcaa34"),
    "velvet_maroon": dict(body="#4a0814", shot="#6a1222", border="#4a0814", gold="#dba01c"),
    "velvet_plum": dict(body="#2a0a30", shot="#4a1a50", border="#2a0a30", gold="#dba01c"),
    "velvet_green": dict(body="#0a2e22", shot="#14503a", border="#0a2e22", gold="#dba01c"),
}

P = (720, 900)   # portrait product/category
SQ = (800, 800)  # lookbook


def build():
    W, H = P
    # categories
    save(finish(stack(W, H, [PAL["green_pink"], PAL["peacock"], PAL["purple"]], seed=1)), "cat-silk")
    save(finish(drape(W, H, PAL["ivory"], seed=2, folds=4, kind="cotton", butta_kind="dot", butta_sp=40, butta_size=3,
                      border=(0.7, 0.22), border_style="solid"), 2), "cat-cotton")
    save(finish(drape(W, H, PAL["black"], seed=3, folds=6, butta_kind="dot", butta_sp=30, butta_size=2.4,
                      border=(0.74, 0.18), border_style="rudraksha"), 3), "cat-designer")
    save(finish(drape(W, H, PAL["maroon"], seed=4, folds=5, border=(0.58, 0.3), butta_sp=50), 4), "cat-bridal")
    save(finish(stack(W, H, [PAL["orange"], PAL["bottle"], PAL["mustard"]], seed=5, bg="blush")), "cat-festive")
    save(finish(drape(W, H, PAL["teal"], seed=6, folds=8, kind="chiffon", print_col="#f2d6e0", butta_kind=None,
                      border=(0.82, 0.08), border_style="solid"), 6), "cat-chiffon")
    save(finish(blouse(W, H, PAL["rani"], seed=7), 7), "cat-blouses")
    save(embroidery(W, H, PAL["velvet_maroon"], seed=8, layout="mandala", S=1.0), "cat-aari")
    save(finish(blouse(W, H, PAL["peacock"], seed=9, stitch=True, bg="ivory"), 9), "cat-stitching")
    save(finish(stack(W, H, [PAL["wine"], PAL["lavender"], PAL["rani"], PAL["teal"]], seed=10, bg="plum")), "cat-boutique")
    # products
    save(finish(drape(W, H, PAL["purple"], seed=11, folds=5, border=(0.62, 0.3)), 11), "p-kanchipuram")
    save(finish(stack(W, H, [PAL["peacock"], PAL["peacock"], PAL["peacock"]], seed=12)), "p-softsilk")
    save(finish(stack(W, H, [dict(PAL["ivory"], matte=True)] * 3, seed=13, bg="blush")), "p-cotton")
    save(finish(drape(W, H, PAL["lavender"], seed=14, folds=9, kind="organza", print_col="#f6e8f0", butta_kind=None,
                      border=(0.8, 0.1), border_style="solid"), 14), "p-chiffon")
    save(finish(stack(W, H, [PAL["maroon"], PAL["maroon"], PAL["maroon"]], seed=15, bg="plum")), "p-bridal")
    save(finish(blouse(W, H, PAL["maroon"], seed=16, heavy=True, stone="#0f7a4a"), 16), "p-aari-blouse")
    save(finish(blouse(W, H, PAL["bottle"], seed=17, heavy=True, bg="ivory"), 17), "p-bridal-blouse")
    save(finish(drape(W, H, PAL["mustard"], seed=18, folds=6, border=(0.64, 0.28), butta_kind="mango", butta_sp=60,
                      butta_size=11), 18), "p-festive")
    # extra catalogue items used by filters
    save(finish(drape(W, H, PAL["green_pink"], seed=19, folds=6, border=(0.6, 0.3)), 19), "p-green-silk")
    save(finish(drape(W, H, PAL["mint"], seed=20, folds=4, kind="cotton", butta_kind="dot", butta_sp=38, butta_size=3,
                      border=(0.72, 0.16), border_style="solid"), 20), "p-linen")
    save(finish(blouse(W, H, PAL["purple"], seed=21, heavy=False, bg="ivory"), 21), "p-designer-blouse")
    save(finish(drape(W, H, PAL["wine"], seed=22, folds=7, kind="chiffon", butta_kind="dot", butta_sp=26, butta_size=2,
                      border=(0.78, 0.14), border_style="rudraksha"), 22), "p-georgette")
    # story / craftsmanship
    save(finish(drape(900, 1100, PAL["purple2"], seed=30, folds=3, amp=1.2, zoom=0.45, border=None, butta_sp=60,
                      butta_size=10, dof=4), 30), "story-silk")
    save(finish(drape(900, 700, PAL["maroon"], seed=31, folds=2, amp=0.6, zoom=0.4, gather=0, tilt=0.1,
                      border=(0.2, 0.6), border_style="temple", dof=3), 31), "story-zari")
    save(embroidery(900, 900, PAL["velvet_plum"], seed=32, layout="vines", S=1.3), "story-embroidery")
    save(finish(blouse(900, 1100, PAL["green_pink"], seed=33, heavy=True, bg="plum"), 33), "story-blouse")
    save(embroidery(900, 700, PAL["velvet_green"], seed=34, layout="border", S=1.2, stone="#b3122e"), "story-pattern")
    # promo banners
    save(finish(drape(1200, 800, PAL["maroon"], seed=40, folds=9, gather=0.4, border=(0.7, 0.2)), 40), "promo-bridal")
    save(finish(blouse(1200, 800, PAL["wine"], seed=41, heavy=True, ox=0.18, sc=1.0), 41), "promo-blouse")
    save(finish(stack(1200, 800, [PAL["orange"], PAL["green_pink"], PAL["mustard"], PAL["rani"]], seed=42,
                      bg="blush", scale=0.85, cx=0.74)), "promo-festive")
    # lookbook
    w, h = SQ
    save(finish(drape(w, h, PAL["rani"], seed=50, folds=6, border=(0.6, 0.3)), 50), "lb-bridal")
    save(finish(drape(w, h, PAL["peacock"], seed=51, folds=10, gather=0.5, border=(0.8, 0.16)), 51), "lb-draping")
    save(finish(blouse(w, h, PAL["wine"], seed=52, heavy=True, bg="ivory"), 52), "lb-blouse-back")
    save(embroidery(w, h, PAL["velvet_green"], seed=53, layout="mandala", S=0.8, stone="#c4163a"), "lb-aari")
    save(finish(stack(w, h, [PAL["mustard"], PAL["orange"], PAL["wine"]], seed=54, bg="blush")), "lb-festive")
    save(finish(drape(w, h, PAL["mint"], seed=55, folds=5, kind="cotton", butta_kind="dot", butta_sp=34,
                      butta_size=3, border=(0.68, 0.2), border_style="solid"), 55), "lb-cotton")
    # mega menu banners
    save(finish(drape(600, 800, PAL["purple"], seed=60, folds=7, gather=0.45, border=(0.7, 0.24)), 60), "mega-sarees")
    save(embroidery(600, 800, PAL["velvet_maroon"], seed=61, layout="vines", S=1.0), "mega-boutique")
    save(finish(blouse(600, 800, PAL["maroon"], seed=62, heavy=True), 62), "mega-stitching")
    # before / after
    save(finish(blouse(900, 900, PAL["peacock"], seed=70, stitch=True, bg="ivory"), 70), "ba-before")
    save(finish(blouse(900, 900, PAL["peacock"], seed=70, heavy=True, bg="ivory"), 70), "ba-after")
    # hero
    save(hero(1920, 1080, "stack", 80), "hero-sarees", q=84)
    save(hero(1920, 1080, "blouse", 81), "hero-boutique", q=84)
    save(hero(1920, 1080, "bridal", 82), "hero-bridal", q=84)


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        globals()[sys.argv[1]]()
    else:
        build()
