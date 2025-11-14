import React, { useEffect, useState } from "react";
import './ProductList.css';
import ProductCard from "./ProductCard";
import type { Product } from "./interfaces/Product";
//importacion del archivo JSON que contiene los productos
//import productsData from "./data/productsArray.json";



//React.FC indica que es un componente funcional de React
const ProductList: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Obtén el token desde donde lo tengas guardado
        const token = localStorage.getItem('token') || ''; // o desde context, state, etc.
        
        const response = await fetch('http://localhost:3000/producto', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Incluye el token en el encabezado Authorization
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
        console.log('Productos consultados:', data);
        setError(null);
      } catch (err) {
        setError(null);
        console.error('Error al consultar productos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Array vacío = se ejecuta solo al montar el componente

  if (loading) return <div>Cargando...</div>; //agregar estilos
  if (error) return <div>Error: {error}</div>;



  //se tipea la array de productos como Product[], esto asegura que cada elemento del array cumple con la interfaz Product
  //const products: Product[] = productsData;

  return (
    <>
      <div className="div-product-list">
        {/*mapeo de la array de productos y para cada producto se renderiza un ProductCard*/}
        {products.map((product) => (
          <ProductCard key={product.id_producto} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
