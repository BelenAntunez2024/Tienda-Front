import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/pages/login/Login'
import Registro from './components/pages/registro/Registro'
import FuncionalidadCarrito from "./components/pages/funcionalidadCarrito/FuncionalidadCarrito";
import FormularioCompra from "./components/pages/confirmarCompra/FormularioCompra";


function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route index path="/" element={<FuncionalidadCarrito />} /> {/* Página de carrito */}
          <Route path="/login" element={<Login />} />  {/* Página de login */}
          <Route path="/registro" element={<Registro/>} /> {/* Página de registro */}
          <Route path="/formulario-compra" element={<FormularioCompra/>} /> {/* Página de confirmación de compra */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;


