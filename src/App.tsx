//import Registro from './components/pages/registro/Registro';
//import Carrito from "./components/pages/carritoModif/CarritoModif";
import './App.css'
import './App.css'
//import EditarPerfil from './components/pages/editarPerfil/EditarPerfil'
import Registro from './components/pages/registro/Registro';
//import Carrito from "./components/pages/carritoModif/CarritoModif";
import HomePage from "./components/pages/homepage/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/pages/login/Login'
import ProductList from "./components/pages/verProductos/ProductList";
import HistorialCompras from './components/pages/verHistorial/HistorialCompras'
import Navbar from "./components/layaut/navbar";
import Footer from "./components/layaut/footer";


function App() {

  return (
    <>
    <Navbar></Navbar>

      <HomePage />
      <ProductList />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />  {/* Página de inicio */}
          <Route path="/registro" element={<Registro />} /> {/* Página del perfil */}
        </Routes>
      </BrowserRouter>
      <HistorialCompras />
      
      <Footer></Footer>
    </>
  );
};

export default App;