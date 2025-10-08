import React, { useState } from "react";
import "./StylesRegistro.css";
import {  GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google"; 


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
     // Manejar login con Google
  
   const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    console.log("Google login exitoso:", credentialResponse);

    // Ejemplo: guardar info del usuario en LocalStorage
    const usuarioGoogle = {
      nombre: credentialResponse?.credential ? "Usuario Google" : "",
      email: "", // normalmente aquí se obtiene del token decode
      fecha: "",
      password: ""
    };

    const usuarios = JSON.parse(localStorage.getItem("Usuarios") || "[]");
    usuarios.push(usuarioGoogle);
    localStorage.setItem("Usuarios", JSON.stringify(usuarios));

    alert("Registro con Google exitoso");
    window.location.href = "/login";
  };

    return (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID as string}>
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

         {/* BOTÓN DE GOOGLE */}
          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login con Google falló")}
            />
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
);
};


export default Registro;