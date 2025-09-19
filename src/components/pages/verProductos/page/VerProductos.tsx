import React from "react";
import './VerProductos.css';
import ProductList from "../ProductList";

const VerProductos: React.FC = () => {
  return (
    <>
      <div className="div-ver-productos">
        <h1>Catálogo de Productos Mágicos</h1>
        <p className="descripcion-productos">
          Explora nuestra colección de objetos esotéricos y paranormales.
        </p>
        
        <ProductList />
      </div>
    </>
  );
};

export default VerProductos;
