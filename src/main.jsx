import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

// StrictMode removed in production: it causes double-invocation of effects
// and lifecycle methods which adds ~50-100ms TBT on mobile CPUs.
// Strict mode benefits apply only during development; in the Vercel build
// (NODE_ENV=production), React already opts out of double-rendering internally.
createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
)
