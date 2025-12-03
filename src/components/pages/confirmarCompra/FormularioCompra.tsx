import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormularioCompra.css"
import type { FormData } from "./interface/formData";
import VolverAtras from "../../layout/VolverAtras";
import {jwtDecode} from "jwt-decode";

function FormularioCompra() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    direccion: "",
    metodoPago: "tarjeta",
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  //handler para los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //handler para enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //validaciones basicas
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.direccion.trim()) {
      setError("Todos los campos son obligatorios");
      setExito("");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Ingrese un correo valido");
      setExito("");
      return;
    }

    if (formData.metodoPago === "transferencia" && !formData.bancoCliente?.trim()) {
      setError("Complete el nombre del banco para la transferencia");
      setExito("");
      return;
    }


    //ARMAR OBJETO DE COMPRA
    const token = localStorage.getItem("token") || "";
    const decoded: any = jwtDecode(token);
    const userId = decoded.id || decoded.Id_usuario || decoded.sub;

    //traer carrito del back
    const carritoRes = await fetch(`http://localhost:3000/item-ordenes/carrito/${userId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const carrito = await carritoRes.json();
    console.log(carrito);
    const items = carrito.map((item: any) => ({
      id_producto: item.producto.id_producto,
      cantidad_productos: item.cantidad_productos,
      userId: decoded.id || decoded.Id_usuario || decoded.sub,
    }));

    const compra = {
      items,
      Id_usuario: userId,
      //userId: decoded.id || decoded.Id_usuario || decoded.sub,
    };

    try {
      const response = await fetch("http://localhost:3000/ordenes/comprar", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(compra)
      });

      if (!response.ok) {
        throw new Error("Error al procesar la compra");
      }

      //simulacion de envio exitosa
      setError("");
      setExito("Compra realizada con exito!");

      //vaciar carrito si la compra fue exitosa
      if (response.ok) {
        await fetch(`http://localhost:3000/item-ordenes/vaciar-carrito/${userId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        localStorage.removeItem("carrito");
      }

    } catch (error) {
      console.error(error);
      setError("No se pudo realizar la compra. Intente nuevamente");
    }

    //guardar el email para el pago
    localStorage.setItem("emailCompra", formData.email);

      //limpiar el formulario
    setFormData({
      nombre: "",
      email: "",
      direccion: "",
      metodoPago: "tarjeta",
      numeroTarjeta: "",
      vencimientoTarjeta: "",
      cvvTarjeta: "",
    });

    setError("");

    setTimeout(() => setExito(""), 3000);

    //redirigir al componente PagosMP
    navigate("/metodoDePago");
  };


  return (
    <>
      <VolverAtras hasNavbar={true} />
      <form
        className="formulario-compra"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2>Formulario de compra</h2>

        <label htmlFor="nombre">Nombre completo:</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Juan Rosas"
          value={formData.nombre}
          onChange={handleChange}
          autoComplete="off"
        />

        <label htmlFor="email">Correo electronico:</label>
        <input
          type="email"
          name="email"
          placeholder="Ej: juanrosas@gmail.com"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
        />

        <label htmlFor="direccion">Direccion de envio:</label>
        <input
          type="text"
          name="direccion"
          placeholder="Ej: Av. Solanet 1234"
          value={formData.direccion}
          onChange={handleChange}
          autoComplete="off"
        />

        <label htmlFor="metodoPago">Metodo de pago:</label>
        <select
          name="metodoPago"
          value={formData.metodoPago}
          onChange={handleChange}
        >
          <option value="tarjeta">Tarjeta (Mercado Pago)</option>
          <option value="transferencia">Transferencia</option>
        </select>

        {/* Tarjeta (Checkout Pro) */}
        {formData.metodoPago === "tarjeta" && (
          <div style={{ marginTop: "10px", color: "#444" }}>
            <p>
              Serás redirigido automáticamente a <strong>Mercado Pago</strong> para completar el pago de forma segura.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!!exito}
        >
          Confirmar compra
        </button>

        {error && (
          <div className="mensaje-error" style={{ color: "red", marginTop: "10px" }}>
            <h3>{error}</h3>
          </div>
        )}

      </form>
    </>
  );
}

export default FormularioCompra;

