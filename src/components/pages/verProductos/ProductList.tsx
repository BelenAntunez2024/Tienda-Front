import React, { useEffect, useState } from "react";
import './ProductList.css';
import ProductCard from "./ProductCard";
import type { Product } from "./interfaces/Product";
import VolverAtras from "../../layout/VolverAtras";
import { useSearchParams } from "react-router-dom";

//React.FC indica que es un componente funcional de React
const ProductList: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token') || ''; 
        const response = await fetch(`https://wisteria-2cn8.onrender.com/producto`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
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
  }, [searchParams]); // Array vacío = se ejecuta solo al montar el componente

  if (loading) return <div>Cargando...</div>; //agregar estilos
  if (error) return <div>Error: {error} </div>;

  
  if (products.length === 0) {
    const searchTerm = searchParams.get('search');
    return (
      <div className="main-container">
        <VolverAtras hasNavbar={true} />
        <div className="div-product-list">
          <p>
            {searchTerm
              ? `No se encontraron resultados para "${searchTerm}".`
              : "No hay productos disponibles para mostrar."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="main-container">
        <VolverAtras hasNavbar={true} />

        <div className="div-product-list">
          {/*mapeo de la array de productos y para cada producto se renderiza un ProductCard*/}
          {products.map((product) => (
            <ProductCard key={product.id_producto} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
