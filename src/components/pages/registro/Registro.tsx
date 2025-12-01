import React, { useEffect, useState } from "react";
import "./StylesRegistro.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import VolverAtras from "../../layout/VolverAtras";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    contraseña: "",
    fechaNacimiento: ""
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Manejar cambios en los inputs

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Manejar el submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombreCompleto || !formData.email || !formData.contraseña || !formData.fechaNacimiento) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("El email no es válido");
      return;
    }

    if (formData.contraseña.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const { nombreCompleto, email, contraseña, fechaNacimiento } = formData;
      console.log('Datos de registro:', formData);

      const response = await fetch("http://localhost:3000/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreCompleto, email, contraseña, fechaNacimiento }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      alert("Registro exitoso");
      navigate("/login");

    } catch (err) {
      console.error("Error al registrar:", err);
      setError("Error al registrar. Verificá tus credenciales.");
    }
  };

  // Manejar login con Google
  useEffect(() => {
    /* @ts-ignore */
    if (window.google && btnRef.current) {
      /* @ts-ignore */
      google.accounts.id.initialize({
        client_id: "TU_CLIENT_ID_WEB.apps.googleusercontent.com",
        callback: handleGoogleSuccess,
      });

      /* @ts-ignore */
      google.accounts.id.renderButton(btnRef.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, []);

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    console.log("Google login exitoso:", credentialResponse);

    // Ejemplo: guardar info del usuario en LocalStorage
    const usuarioGoogle = {
      nombreCompleto: credentialResponse?.credential ? "Usuario Google" : "",
      email: "", // normalmente aquí se obtiene del token decode
      fechaNacimiento: "",
      contraseña: ""
    };

    const usuarios = JSON.parse(localStorage.getItem("Usuarios") || "[]");
    usuarios.push(usuarioGoogle);
    localStorage.setItem("Usuarios", JSON.stringify(usuarios));

    alert("Registro con Google exitoso");
    window.location.href = "/login";
  };

  return (
    <div className="main-container-registro">
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID as string}>
      <section className="registro-page">
        <div className="registro-box">
          <VolverAtras hasNavbar={true} />
          <div className="registro-header">
            <img src="img/logo.png" alt="logo" className="logo" />
            <h1 className="title">WISTERIA</h1>
            <h2 className="subTitle">Registrate</h2>
          </div>

          {/* FORMULARIO ORDENADO */}
          <form onSubmit={handleSubmit}>
            <div className="registro-form">
              <label htmlFor="nombreCompleto">Nombre Completo</label>
              <input
                type="text"
                name="nombreCompleto"
                placeholder="Nombre Completo"
                value={formData.nombreCompleto}
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
              <label htmlFor="contraseña">Contraseña</label>
              <input
                type="contraseña"
                name="contraseña"
                placeholder="Contraseña"
                value={formData.contraseña}
                onChange={handleChange}
              />
            </div>

            <div className="registro-form">
              <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-registro">Registrarse</button>
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
    </div>
  );
};

export default Registro;