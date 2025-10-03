import { useParams } from "react-router-dom";
import type { Product } from "../verProductos/interfaces/Product";
import productsData from "../verProductos/data/productsArray.json"
import { useState } from "react";
import type { Comment } from "./interfaces/comment";
import "./ProductDetail.css";


const ProductDetail: React.FC = () =>{
    const {id} = useParams<{id:string}>();
    const product: Product | undefined = productsData.find(
        (p) => p.id === Number(id)
    );

    const[comments,setComments] = useState <Comment[]>([]);
    const[newComment,setNewComment] = useState("");
    const[rating,setRating] = useState(0);

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
    
    /* Manejo de Replicas?*/
    const handleReply = (id: number, reply: string) =>{
        setComments((prev)=>
        prev.map((c) =>
            c.id === id ? {...c, replies: [...c.replies, reply]} : c
    )
    );
    };

return (
  <>
    <div className="product-detail">
  <div className="product-layout">
    {/* Columna izquierda */}
    <div className="product-image">
      <img src={product.image} alt={product.name} />
    </div>

    {/* Columna derecha */}
    <div className="product-info">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="precio">Precio: ${product.price}</p>
      <button className="btn-carrito">Agregar al carrito</button>
    </div>
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
    </div>
  </>
);
};
export default ProductDetail;