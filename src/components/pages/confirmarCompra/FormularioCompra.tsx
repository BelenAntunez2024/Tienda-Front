import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormularioCompra.css"
import type { FormData } from "./interface/formData";
import VolverAtras from "../../layout/VolverAtras";

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
  const handleSubmit = (e: React.FormEvent) => {
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

    //guardar el email para el pago
    localStorage.setItem("emailCompra", formData.email);

    setError("");

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

