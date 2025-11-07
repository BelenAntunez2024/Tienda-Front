
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';

//import Navbar from "./components/layaut/navbar";
import HomePage from "./components/pages/homepage/Homepage";
import Login from './components/pages/login/Login';
import Registro from './components/pages/registro/Registro';
import VerProductos from './components/pages/verProductos/page/VerProductos';
//import FuncionalidadCarrito from './components/pages/funcionalidadCarrito/FuncionalidadCarrito';
//import HistorialCompras from './components/pages/verHistorial/HistorialCompras'
//import Footer from "./components/layaut/footer";


function App() {

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
            {/*<Route path="/funcionalidadCarrito" element={<FuncionalidadCarrito />} />*/}
          </Route>

          {/* ======================================= */}
          {/* GRUPO 2: RUTAS SIN NAVBAR NI FOOTER */}
          {/* ======================================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />


          {/* Puedes añadir una ruta de 404 aquí si quieres */}
          {/* <Route path="*" element={<h1>404 - Página no encontrada</h1>} /> */}

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;