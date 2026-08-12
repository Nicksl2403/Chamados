import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes, Route, Navigate, } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Admin from "./Admin.jsx"
createRoot(document.getElementById('root')).render(
     <BrowserRouter>
  <StrictMode>
      <Routes>
        {/* Página principal */}
        <Route path="/Chamados" element={<App />} />
        {/* Qualquer endereço errado volta para / */}
        <Route path="*" element={<Navigate to="/Chamados" replace />} />
        <Route path="/ADM" element={<Admin/>} />
     </Routes>
  </StrictMode>
       </BrowserRouter>

)
