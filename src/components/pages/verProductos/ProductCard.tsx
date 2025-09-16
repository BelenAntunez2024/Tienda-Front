import React from "react";
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
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} width={200} />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    </>
  );
};

export default ProductCard;
