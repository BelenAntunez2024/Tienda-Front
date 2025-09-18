import React from "react";
import ProductList from "./ProductList";

const VerProductos: React.FC = () => {
  return (
    <div>
      <h1>✨ Catálogo de Productos Mágicos ✨</h1>
      <p>Explora nuestra colección de objetos esotéricos y paranormales.</p>
      <ProductList />
    </div>
  );
};

export default VerProductos;
