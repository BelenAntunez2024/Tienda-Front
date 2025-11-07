import React from "react";
import './ProductCard.css';
import type { Product } from "./interfaces/Product.ts";

interface ProductCardProps { //Props que recibe el componente
  product: Product; //interfaz del producto
}


//React.FC indica que es un componente funcional de React
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <>
      <div className="div-product-card">
        {/*product. muestra la información del producto que solicito*/}
        <h2>{product.nombre}</h2>
        <img src={product.imagen} alt={product.nombre} width={200} />
        {/*<p className="p-description">{product.descripcion}</p>*/}
        <p className="p-precio">Precio: ${product.precio}</p>
      </div>
    </>
  );
};

export default ProductCard;
