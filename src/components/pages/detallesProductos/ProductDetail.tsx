import { useParams } from "react-router-dom";
import type { Product } from "../verProductos/interfaces/Product";
import productsData from "../verProductos/data/productsArray.json"
import { useState, useEffect } from "react";
import type { Comment } from "./interfaces/comment";
import "./ProductDetail.css";
import { Link } from "react-router-dom";



const ProductDetail: React.FC = () =>{
    const {id} = useParams<{id:string}>();
    const [product, setProduct] = useState<Product | undefined>
      ( productsData.find((p) =>  p.id === Number(id))
    );

    const[comments,setComments] = useState <Comment[]>([]);
    const[newComment,setNewComment] = useState("");
    const[rating,setRating] = useState(0);
  
    if(!product){
        return <h2>Producto no encontrado</h2>
    }
     
     // 👇 Este useEffect actualiza el producto cuando cambia el id
    useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === Number(id));
    setProduct(foundProduct);
    window.scrollTo(0, 0); // opcional, para hacer scroll arriba
    }, [id]);

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
    const filteredProducts = productsData.filter((p) => p.id !== product.id);
    
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
      <img src={product.image} alt={product.name} />
    </div>

    {/* Columna derecha */}
    <div className="product-info">
      <h2>{product.name}</h2>
      <h3 className="product-price">${product.price}</h3>
      <p className="discount"> ${(product.price * 0.8).toFixed(2)} con 20% OFF transferencia</p>
      
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
          <button className="btn-add">Agregar al carrito</button>
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
      <p>{product.description}</p>
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
          <div key={p.id} className="related-item">
            <Link to={`/producto/${p.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
              <img src={p.image} alt={p.name}/>
              <p>{p.name}</p>
              <span>${p.price}</span>
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