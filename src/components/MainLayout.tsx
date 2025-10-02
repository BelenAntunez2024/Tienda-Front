import { Outlet } from 'react-router-dom';
import Navbar from './layaut/navbar';
import Footer from './layaut/footer';

function MainLayout() {
  return (
    <>
      <Navbar /> {/* <-- Componente que siempre se muestra */}
      <main>
        <Outlet /> {/* <-- Aquí se renderizará el contenido de las rutas hijas */}
      </main>
      <Footer /> {/* <-- Componente que siempre se muestra */}
    </>
  );
}

export default MainLayout;