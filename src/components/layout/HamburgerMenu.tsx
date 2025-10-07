
import { GiSpiralBottle, GiStarsStack } from "react-icons/gi"; 
import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="hamburger-container">
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}

      <button
        className={`hamburger-button ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}>
        {isOpen ? (
        <GiStarsStack size={40} color="#FFD700" /> // ✨ Estrella cuando está abierto
         ) : (
        <GiSpiralBottle size={40} color="#5a3a70"  /> // 🧪 Botella cuando está cerrado
        )}
        </button>

      <ul className={`hamburger-menu ${isOpen ? "open" : ""}`}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/registro">Registro</Link></li>
        <li><Link to="/verProductos">Productos</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/quienesSomos">Quienes Somos</Link></li>
        <li><Link to="/comoComprar">Como Comprar</Link></li>
        <li><Link to="/pregFrecuentes">Preguntas Frecuentes</Link></li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
