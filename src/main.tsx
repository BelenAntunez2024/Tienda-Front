import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Registro from './components/pages/registro/Registro.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Registro/>
  </StrictMode>,
)
