import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'
import { ShopProvider } from './store/shop'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ShopProvider>
        <App />
      </ShopProvider>
    </MotionConfig>
  </StrictMode>,
)
