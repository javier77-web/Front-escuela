import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { AuthProvider } from './auth/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  {/* el auth provider envuelve a la app, para asi tener contexto de los user */}
      <App />
    </AuthProvider>
  </StrictMode>,
)
