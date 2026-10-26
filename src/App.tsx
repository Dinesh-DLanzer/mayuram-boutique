import { Categories } from './components/Categories'
import { Contact } from './components/Contact'
import { FloatingWhatsApp, ScrollProgress } from './components/Floating'
import { Faq, Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Lookbook } from './components/Lookbook'
import { BagDrawer, QuickView, Toasts } from './components/Overlays'
import { Products } from './components/Products'
import { Promos } from './components/Promos'
import { Services } from './components/Services'
import { Story } from './components/Story'
import { Testimonials } from './components/Testimonials'

export default function App() {
  return (
    <>
      <a href="#shop" className="sr-only z-[100] rounded-full bg-gold px-4 py-2 text-midnight focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to products
      </a>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Categories />
        <Products />
        <Services />
        <Story />
        <Promos />
        <Testimonials />
        <Lookbook />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <QuickView />
      <BagDrawer />
      <Toasts />
      <FloatingWhatsApp />
    </>
  )
}
