import { useState } from "react";
import "./FormularioCompra.css"
import type { FormData } from "./interface/formData";
import { jwtDecode } from "jwt-decode";


function FormularioCompra() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    direccion: "",
    metodoPago: "tarjeta",
    numeroTarjeta: "",
    vencimientoTarjeta: "",
    cvvTarjeta: "",
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

    //validacion de tarjeta
    if (
      formData.metodoPago === "tarjeta" && (
        !formData.numeroTarjeta?.trim() ||
        !formData.vencimientoTarjeta?.trim() ||
        !formData.cvvTarjeta?.trim())
    ) {
      setError("Complete todos los datos de la tarjeta");
      setExito("");
      return;
    }

    //validacion de transferencia
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

    const items = carrito.map((item: any) => ({
      id_producto: item.producto.id_producto,
      cantidad_productos: item.cantidad_productos,
      userId: decoded.id || decoded.Id_usuario || decoded.sub,
    }));

    const compra = {
      items,
      userId: decoded.id || decoded.Id_usuario || decoded.sub,
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

      //vaciar carrito
      await fetch("http://localhost:3000/ordenes/vaciar-carrito", {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

    } catch (error) {
      console.error(error);
      setError("No se pudo realizar la compra. Intente nuevamente");
    }


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

    //borrar mensaje de exito a los tres segundos
    setTimeout(() => setExito(""), 3000);
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
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
        </select>

        {/*para la tarjeta*/}
        {formData.metodoPago === "tarjeta" && (
          <>
            <label htmlFor="numeroTarjeta">Numero de tarjeta:</label>
            <input
              type="text"
              name="numeroTarjeta"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              value={formData.numeroTarjeta}
              onChange={handleChange}
              autoComplete="off"
              maxLength={19}
            />

            <label htmlFor="vencimientoTarjeta">Fecha de vencimiento:</label>
            <input
              type="month"
              name="vencimientoTarjeta"
              placeholder="MM/AA"
              value={formData.vencimientoTarjeta}
              onChange={handleChange}
              autoComplete="off"
              maxLength={7}
            />

            <label htmlFor="cvvTarjeta">Codigo de seguridad (CVV):</label>
            <input
              type="text"
              name="cvvTarjeta"
              placeholder="XXX"
              value={formData.cvvTarjeta}
              onChange={handleChange}
              autoComplete="off"
              maxLength={3}
            />
          </>
        )}

        {/*para la transferencia*/}
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
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!!exito} //deshabilita el boton si ya se envio con exito
        >
          Confirmar compra
        </button>


        {/*muestra los msjs de error o exito*/}
        {error && (
          <div className="mensaje-error" style={{ color: "red", marginTop: "10px" }}>
            <h3>{error}</h3>
          </div>
        )}

        {exito && (
          <div className="mensaje-exito" style={{ color: "green", marginTop: "10px" }}>
            <h3>{exito}</h3>
          </div>
        )}
      </form>
    </>
  );
}

export default FormularioCompra;