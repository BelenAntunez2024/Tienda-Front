import "./navbar.css";
import HamburgerMenu from "./HamburgerMenu"; // 👈 importamos el menú


const Navbar = () => {

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        {/* 👈 Menú hamburguesa a la izquierda */}
        <div className="nav-left">
          <HamburgerMenu />
        </div>

        {/* Logo en el centro */}
        <div className="nav-center">
          <h1 className="titulo">WISTERIA</h1>
          <img src="./img/logo.png" alt="logo" className="logo-img" />
        </div>

        {/* Carrito a la derecha */}
        <div className="nav-right">
          <button className="cart-button">
            <i className="fas fa-shopping-cart" style={{ fontSize: "30px", color: "#5a3a70" }}></i>
          </button>
        </div>
      </nav>

      {/* BARRA DE BUSQUEDA */}
      <div className="search-bar">
        <input type="text" placeholder="Buscar..." />
        <button>
          <i className="fas fa-search"></i>
        </button>
      </div>
    </>
  );
};

export default Navbar;
