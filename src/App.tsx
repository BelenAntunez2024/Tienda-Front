
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from "./components/pages/homepage/Homepage";
import Login from './components/pages/login/Login';
import Registro from './components/pages/registro/Registro';
import VerProductos from './components/pages/verProductos/page/VerProductos';
import ProductDetail from './components/pages/detallesProductos/ProductDetail';
import ComoComprar from './components/pages/comoComprar/ComoComprar';
import VerDatosDeContacto from './components/pages/verDatosDeContacto/VerDatosDeContacto';
import FuncionalidadCarrito from './components/pages/funcionalidadCarrito/FuncionalidadCarrito';
import FormularioCompra from './components/pages/confirmarCompra/FormularioCompra';
import HistorialCompras from './components/pages/verHistorial/HistorialCompras';
import PerfilUsuario from './components/pages/editarPerfil/Perfil';
import PagosMP from './components/pages/MetodoDePago/pagosMP';
import PagoExitoso from './components/pages/MetodoDePago/PagoExitoso';
import PagoFallido from './components/pages/MetodoDePago/PagoFallido';
import PagoPendiente from './components/pages/MetodoDePago/PagoPendiente';
import EditarPerfil from './components/pages/editarPerfil/EditarPerfil';


function App ()  {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* ======================================= */}
          {/* GRUPO 1: RUTAS QUE SÍ LLEVAN NAVBAR Y FOOTER */}
          {/* ======================================= */}
          <Route element={<MainLayout />}>
            {/* Todas estas rutas se inyectarán en el <Outlet> del MainLayout */}
            <Route path="/" element={<HomePage />} />
            <Route path="/verProductos" element={<VerProductos />} />
            <Route path='/producto/:id' element={<ProductDetail />} />
            <Route path="/contacto" element={<VerDatosDeContacto />} />
            <Route path="/comoComprar" element={<ComoComprar />} />
            <Route path="/funcionalidadCarrito" element={<FuncionalidadCarrito />} />
            <Route path="/confirmarCompra" element={<FormularioCompra />} />
            <Route path="/historialCompras" element={<HistorialCompras />} />
            <Route path="/perfilUsuario" element={<PerfilUsuario />} />
            <Route path="/editar-perfil" element={<EditarPerfil />} />
            <Route path="/metodoDePago" element={<PagosMP />} />
            <Route path="/success" element={<PagoExitoso />} />
            <Route path="/failure" element={<PagoFallido />} />
            <Route path="/pending" element={<PagoPendiente />} /> 
          </Route>

          {/* ======================================= */}
          {/* GRUPO 2: RUTAS SIN NAVBAR NI FOOTER */}
          {/* ======================================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />


          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
