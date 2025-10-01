
import { GiSpiralBottle, GiStarsStack } from "react-icons/gi"; 
import React, { useState } from "react";
import "./navbar.css";

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
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#productos">Productos</a></li>
        <li><a href="#contacto">Contacto</a></li>
        <li><a href="#quienesSomos">Quienes Somos</a></li>
        <li><a href="#comoComprar">Como Comprar</a></li>
        <li><a href="#pregFrecuentes">Preguntes Frecuentes</a></li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
