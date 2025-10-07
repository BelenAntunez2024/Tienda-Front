//import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import VerProductos from './components/pages/verProductos/page/VerProductos';
//import ProductDetail from './components/pages/detallesProductos/ProductDetail';
//import Registro from "./components/pages/registro/Registro";
//import HomePage from "./components/pages/homepage/Homepage";
import Navbar from "./components/layaut/navbar";
import Footer from "./components/layaut/footer";
import ComoComprar from './components/pages/comoComprar/ComoComprar';

function App ()  {

  return (

    <>
      <Navbar/>
    <ComoComprar></ComoComprar>
      <Footer></Footer>


    </>
  );
};

export default App;


