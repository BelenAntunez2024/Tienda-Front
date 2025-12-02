import { useEffect } from "react";
import { Link } from "react-router-dom";

const PagoExitoso = () => {

  useEffect(() => {
    localStorage.removeItem("carrito");
    localStorage.removeItem("emailCompra");
  }, []);

  return (
    <main className="pago-exitoso">
      <h1>✅ ¡Pago realizado con éxito!</h1>

      <p>
        Tu compra fue confirmada.  
        ¡Gracias por elegir <strong>Wisteria ✨</strong>!
      </p>

      <Link to="/">
        Seguir comprando
      </Link>

    </main>
  );
};

export default PagoExitoso;
