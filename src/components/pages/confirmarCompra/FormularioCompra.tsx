import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormularioCompra.css"
import type { FormData } from "./interface/formData";

function FormularioCompra() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    direccion: "",
    metodoPago: "tarjeta",
    // ❌ Ya no usamos datos de tarjeta
    //numeroTarjeta: "",
    //vencimientoTarjeta: "",
    //cvvTarjeta: "",
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

    // ❌ Ya NO valido tarjeta porque Checkout Pro lo maneja afuera

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

        {/* Transferencia 
        {formData.metodoPago === "transferencia" && (
          <>
            <h4>Datos de la transferencia</h4>
            <p>Realice la transferencia a la siguiente cuenta:</p>
            <p><strong>Banco:</strong> Banco Ejemplo</p>
            <p><strong>CBU:</strong> 123456789</p>
            <p><strong>Alias:</strong> wisteria.aya</p>
            <p><strong>Titular:</strong> Wisteria Tienda Esoterica</p>

            <label htmlFor="bancoCliente">Banco desde el cual se realiza la transferencia:</label>
            <input
              type="text"
              name="bancoCliente"
              placeholder="Ej: Banco Nacional"
              value={formData.bancoCliente || ""}
              onChange={handleChange}
              autoComplete="off"
            />

            <label htmlFor="aliasCliente">Alias:</label>
            <input
              type="text"
              name="aliasCliente"
              placeholder="Ej: wisteria.aya"
              value={formData.aliasCliente || ""}
              onChange={handleChange}
              autoComplete="off"
            />

            <label htmlFor="titularCliente">Titular:</label>
            <input
              type="text"
              name="titularCliente"
              placeholder="Ej: Wisteria Tienda Esoterica"
              value={formData.titularCliente || ""}
              onChange={handleChange}
              autoComplete="off"
            />

            <label htmlFor="numeroOperacion">Numero de operación:</label>
            <input
              type="text"
              name="numeroOperacion"
              placeholder="Ej: 123456789"
              value={formData.numeroOperacion || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </>
        )}*/}

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

