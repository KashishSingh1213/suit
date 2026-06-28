import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'

// Route to admin panel if URL has ?admin query param or #admin hash
const isAdmin =
  window.location.hash === '#admin' ||
  new URLSearchParams(window.location.search).has('admin')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdmin ? <AdminApp /> : <App />}
  </StrictMode>,
)
