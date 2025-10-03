import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import VerProductos from './components/pages/verProductos/page/VerProductos';
import ProductDetail from './components/pages/detallesProductos/ProductDetail';

//import Registro from "./components/pages/registro/Registro";
//import HomePage from "./components/pages/homepage/Homepage";
import Navbar from "./components/layaut/navbar";
import Footer from "./components/layaut/footer";

function App ()  {

  return (

    <>
      <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<VerProductos/>} />
        <Route path='/producto/:id' element={<ProductDetail/>} />
      </Routes>
    </BrowserRouter>
      <Footer></Footer>


    </>
  );
};

export default App;


