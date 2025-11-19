import { useParams } from "react-router-dom";
import type { Product } from "../verProductos/interfaces/Product";
import { useState, useEffect } from "react";
import type { Comment } from "./interfaces/comment";
import "./ProductDetail.css";
import { Link } from "react-router-dom";
import type { CarritoItem } from "../funcionalidadCarrito/interfaces/CarritoItem";


const ProductDetail: React.FC = () =>{
    const { id: id_producto } = useParams<{ id: string }>();    const [product, setProduct] = useState<Product | undefined>(undefined);    
    const[comments,setComments] = useState <Comment[]>([]);
    const[newComment,setNewComment] = useState("");
    const[rating,setRating] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [carrito, setCarrito] = useState<CarritoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isAdding, setIsAdding] = useState(false); // Estado para el botón de agregar al carrito

   // Obtener todos los productos (para productos sugeridos)
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const token = localStorage.getItem('token') || '';
                const response = await fetch('http://localhost:3000/producto', {
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
                setAllProducts(data);
                console.log('Productos consultados:', data);
            } catch (err) {
                console.error('Error al consultar productos:', err);
            }
        };
        fetchAllProducts();
    }, []);

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || '';
      const response = await fetch(`http://localhost:3000/producto/${id_producto}`, {
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
      setProduct(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al cargar el producto.";
      setError(errorMessage); 
      console.error('Error al consultar producto:', err);
  } finally {
      setLoading(false); 
    }
  };
  if (id_producto) {
    fetchProduct();
  }
  }, [id_producto]);

    //funcion para agregar productos al carrito
    const agregarAlCarrito = async (producto: Product, { idOrden }: { idOrden: number }) => {
      setIsAdding(true); // Inicia la carga del botón para agregar al carrito

        try {
            const response = await fetch("http://localhost:3000/item-ordenes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_producto: producto.id_producto,
                    // cada clic agrega una unidad
                    cantidad_productos: 1,
                    id_orden: idOrden
                }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

          const itemOrdenCreado = await response.json();

            setCarrito(prevCarrito => {
            const itemExistente = prevCarrito.find((item) => item.id_producto === producto.id_producto);
            // Si el POST fue exitoso, actualizamos el estado local del carrito
            if (itemExistente) {
                // Actualiza el carrito si el ítem ya existe
                return prevCarrito.map(item =>
                    item.id_producto === producto.id_producto ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            } else {
                // Añade el nuevo ítem si no existe
                const nuevoProducto = { ...producto, 
                  cantidad: 1,
                  id_item_orden: itemOrdenCreado.id_item_orden} as CarritoItem;
                console.log("Producto agregado:", producto.nombre);
                return [...prevCarrito, nuevoProducto];
            }
        });
            setError(null);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Error desconocido al agregar producto al carrito.";
          setError(errorMessage); 
          console.error('Error al agregar al carrito:', err);
          alert(`Fallo al agregar: ${errorMessage}`);
    } finally {
        setIsAdding(false); // Finaliza la carga del botón para agregar al carrito 
    }
  }

    if (loading) return <div>Cargando...</div>; //agregar estilos
    if (error) return <div>Error: {error}</div>;

    if(!product){
        return <h2>Producto no encontrado</h2>
    }
 
    /*Manejo del nuevo comentario */
    const handleAddComment = () =>{
        if(newComment.trim()){
            const newEntrada:Comment = {
            id: comments.length +1,
            user: "Usuario Anonimo",
            text: newComment,
            rating,
            replies: [],
        };
        setComments([...comments,newEntrada]);
        setNewComment("");
        setRating(0);
      };
    };
    
    /* Manejo de Replicas*/
    const handleReply = (id: number, reply: string) =>{
        setComments((prev)=>
        prev.map((c) =>
            c.id === id ? {...c, replies: [...c.replies, reply]} : c
    )
    );
    };
    /*Manejo de envio */
    const handleEnvioAndreani = () =>{
      const url =  `https://www.andreani.com/?tab=cotizar-envio`;
      window.open(url, "_blank")
    };
    const handleEnvioOCA = () =>{
      const url =  `https://www.oca.com.ar/`;
      window.open(url, "_blank");
    };
    // Filtramos para excluir el producto actual
    const filteredProducts = allProducts.filter((p) => p.id_producto !== product.id_producto);  

    // Mezclamos el array aleatoriamente
    const shuffled = [...filteredProducts].sort(() => Math.random() - 0.5);
    
    // Tomamos los 3 primeros
    const suggestedProducts = shuffled.slice(0, 3);
return (
  <>
    <div className="product-detail">
  <div className="product-container">
    {/* Columna izquierda-imagen */}
    <div className="product-image">
      <img src={product.imagen} alt={product?.nombre} />
    </div>

    {/* Columna derecha */}
    <div className="product-info">
      <h2>{product.nombre}</h2>
      <h3 className="product-price">${product.precio}</h3>
      <p className="discount"> ${(product.precio * 0.8).toFixed(2)} con 20% OFF transferencia</p>
      
       {/*Metodos de pago*/}
      <div className="pagos">
          <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/visa.png"  
          alt="Visa" />
          <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/mastercard.png"  
          alt="Mastercard" />
          <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/deposito.png" 
          alt="transferencia" />
      </div>
        <p className="promo">Hasta 3 cuotas sin interés con tarjeta de débito</p>

      {/*Cantidades*/}
      <div className="cantidad-section">
          <label>Cantidad:</label>
          <input type="number" min="1" max="10" defaultValue="1" />
        </div>

        {/* Botones */}
        <div className="buttons">
          <button 
            className="btn-add"
            onClick={() => agregarAlCarrito(product, { idOrden: 1 })}
            disabled={isAdding} // desactiva el botón mientras se está agregando
        >
            {isAdding ? 'Agregando...' : 'Agregar al carrito'}
            </button>
          <button className="btn-buy">Comprar ahora</button>
        </div>

         <div className="MetodoEnvio">
          <p>🚚 Consulta tu envio por codigo postal: <strong></strong></p>
          <button className="btn-cp" onClick={handleEnvioAndreani}>Consultar en Andreani</button>
          <button className="btn-cp" onClick={handleEnvioOCA}>Consultar en OCA</button>
        </div>
      </div>
    </div>

        {/* Descripción */}
    <div className="product-description">
      <h3>Descripción del producto</h3>
      <p>{product.descripcion}</p>
    </div>
    
      {/* Opiniones */}
      <div className="comentarios">
        <h3>Dejanos tu opinión sobre el producto:</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe tu comentario"
        />
        <div className="calificacion">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: "pointer",
                color: star <= rating ? "gold" : "gray",
              }}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <button onClick={handleAddComment}>Enviar comentario</button>

        <ul>
          {comments.map((c) => (
            <li key={c.id}>
              <p>
                <strong>{c.user}</strong> ({c.rating}★): {c.text}
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Responder"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      handleReply(c.id, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
              <ul>
                {c.replies.map((r, idx) => (
                  <li key={idx} className="reply">
                    ↳ {r}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
       {/* Productos sugeridos */}
    <div className="related-products">
      <h3>Podés comprar también:</h3>
      <div className="related-grid">
        {suggestedProducts.map((p) => (
          <div key={p.id_producto} className="related-item">
            <Link to={`/producto/${p.id_producto}`} style={{textDecoration: 'none', color: 'inherit'}}>
              <img src={p.imagen} alt={p.nombre}/>
              <p>{p.nombre}</p>
              <span>${p.precio}</span>
              <div className="rediProduct">
                <button className="btn-vermas">Ver mas</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
    
  </>
);
};
export default ProductDetail;