import React, { useState } from "react";
import "./StylesRegistro.css";


const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        fecha: ""
    });

    const [error, setError] = useState("");

    // Manejar cambios en los inputs
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones
        if (!formData.nombre || !formData.email || !formData.password || !formData.fecha) {
            setError("Todos los campos son obligatorios");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("El email no es válido");
            return;
        }

        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        // Simulación JSON con LocalStorage
        const usuarios = JSON.parse(localStorage.getItem("Usuarios") || "[]");
        const usuarioExistente = usuarios.find((u: any) => u.email === formData.email);

        if (usuarioExistente) {
            setError("Ya existe un usuario con este email");
            return;
        }

        usuarios.push(formData);
        localStorage.setItem("Usuarios", JSON.stringify(usuarios));

        alert("Registro Exitoso");
        window.location.href = "/login";
    };

    return (
  <section className="registro-page">
    <div className="registro-box">
      <div className="registro-header">
        <img src="./public/img/logo.png" alt="logo" className="logo" />
        <h1 className="title">WISTERIA</h1>
        <h2 className="subTitle">Registrate</h2>
      </div>

      {/* FORMULARIO ORDENADO */}
        <form onSubmit={handleSubmit}>
         <div className="registro-form">
          <label htmlFor="nombre">Nombre Completo</label>
           <input
            type="text"
            name="nombre"
            placeholder="Nombre Completo"
            value={formData.nombre}
            onChange={handleChange}
            required
            />
         </div>
         <div className="registro-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            />
         </div>

         <div className="registro-form">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
           />
         </div>

         <div className="registro-form">
          <label htmlFor="fecha">Fecha de nacimiento</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
           />
         </div>

          <button type="submit" className="btn">Registrarse</button>
        </form>

      {error && <p className="error">{error}</p>}
    </div>
  </section>
);
};


export default Registro;