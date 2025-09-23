
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
        <GiSpiralBottle size={40} color="#B19CD9" /> // 🧪 Botella cuando está cerrado
        )}
        </button>

      <ul className={`hamburger-menu ${isOpen ? "open" : ""}`}>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
