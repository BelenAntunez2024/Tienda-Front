import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PagosMP = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const iniciarPago = async () => {

      try {

        const token = localStorage.getItem('token') || '';
        if (!token) {
          alert("No estás autenticado");
          return navigate("/");
        }

        const decoded: any = jwtDecode(token);
        const userId = decoded.id || decoded.Id_usuario || decoded.sub;

        // Obtener carrito desde el backend
        const responseCarrito = await fetch(`http://localhost:3000/item-ordenes/carrito/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!responseCarrito.ok) {
          throw new Error("Error al obtener el carrito");
        }

        const dataCarrito = await responseCarrito.json();
        const productos = dataCarrito.map((item: any) => ({
          ...item.producto,
          cantidad: item.cantidad_productos,
          precio: item.producto.precio // Asegurar que tenga precio
        }));

        if (productos.length === 0) {
          alert("No hay productos en el carrito");
          return navigate("/");
        }

        const email = localStorage.getItem("emailCompra");

        if (!email) {
          alert("Falta el email");
          return navigate("/confirmarCompra");
        }

        const response = await fetch(
          "http://localhost:3000/mercado-pago/crear-preferencia",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              productos,
              email,
              userId
            })
          }
        );

        const data = await response.json();

        if (!data.init_point) {
          throw new Error("No se pudo crear la preferencia");
        }

        // 🔀 REDIRECT A MERCADO PAGO
        window.location.href = data.init_point;

      } catch (err) {

        console.error("Error iniciando pago:", err);
        alert("Ocurrió un error al iniciar el pago");
        navigate("/");

      } finally {
        setLoading(false);
      }

    };

    iniciarPago();

  }, []);

  return (
  <main style={{textAlign:"center", marginTop:"3rem"}}>
    {loading ? (
      <div>
        <h2>Cargando...</h2>
        <p>Procesando tu pago, por favor espera.</p>
      </div>
    ) : (
      <div>
        <h2>Conectando con Mercado Pago...</h2>
        <p>Por favor espera</p>
      </div>
    )}
  </main>
);
};

export default PagosMP;
