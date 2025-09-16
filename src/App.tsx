import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/pages/login/Login'
import Registro from './components/pages/registro/Registro'
function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />  {/* Página de inicio */}
          <Route path="/registro" element={<Registro/>} /> {/* Página del perfil */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
