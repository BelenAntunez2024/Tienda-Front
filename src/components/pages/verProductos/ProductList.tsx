import React from "react";
import ProductCard from "./ProductCard";
import type { Product } from "./interfaces/Product";
//importacion del archivo JSON que contiene los productos
import productsData from "./data/productsArray.json";



//React.FC indica que es un componente funcional de React
const ProductList: React.FC = () => {
  //se tipea la array de productos como Product[], esto asegura que cada elemento del array cumple con la interfaz Product
  const products: Product[] = productsData;

  return (
    <>
      <div className="div-product-list">
        <h2>Lista de Productos</h2>
        {/*mapeo de la array de productos y para cada producto se renderiza un ProductCard*/}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
