import "./navbar.css";
import HamburgerMenu from "./HamburgerMenu"; 
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const Navbar = () => {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate(); 

  const handleSearch = () => {
    if (busqueda.trim()) {
      navigate(`/verProductos?search=${busqueda.trim()}`); 
    } else {
      navigate('/verProductos');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        {/*  Menú hamburguesa a la izquierda */}
        <div className="nav-left">
          <HamburgerMenu />
        </div>

        {/* Logo en el centro */}
        <div className="nav-center">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 className="titulo">WISTERIA</h1>
          </Link>
          <img src="/img/logo.png" alt="logo" className="logo-img" />
        </div>

        {/* Carrito a la derecha */}
        <div className="nav-right">
          <Link to={`/funcionalidadCarrito`} style={{ textDecoration: 'none' }}>
            <button className="cart-button">
              <i className="fas fa-shopping-cart" style={{ fontSize: "30px", color: "#5a3a70" }}></i>
            </button>
          </Link>
        </div>
      </nav>


      {/* BARRA DE BUSQUEDA MODIFICADA */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    </>
  );
};

export default Navbar;
