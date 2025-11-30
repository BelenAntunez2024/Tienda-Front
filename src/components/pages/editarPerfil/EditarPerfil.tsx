import VolverAtras from "../../layout/VolverAtras";
import "./EditarPerfil.css";
import { useState } from "react";


const EditarPerfil = () => {

  //HOOKS DE ESTADO
  const [editData, setEditData] = useState({ //guarda los datos del form
    nombreCompleto: "",
    email: "",
    password: "",
    fecha: "",
    foto: ""
  });

  const [perfilActualizado, setPerfilActualizado] = useState(false); //para mostrar mensaje de exito

  const [error, setError] = useState(""); //para mostrar errores de validacion

  //HANDLERS DE CAMBIO actualiza los datos del usuario al escribir en los imputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  //HANDLER DE ENVIO
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!editData.nombreCompleto || !editData.email || !editData.password || !editData.fecha) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(editData.email)) {
      setError("El email no es válido");
      return;
    }

    if (editData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const Id_usuario = localStorage.getItem('Id_usuario');

      const response = await fetch(`http://localhost:3000/usuario/${Id_usuario}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombreCompleto: editData.nombreCompleto,
          email: editData.email,
          contraseña: editData.password,
          fechaNacimiento: editData.fecha,
          foto: editData.foto
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPerfilActualizado(true)
      alert("Perfil actualizado correctamente");
      console.log("Datos actualizados:", data);

    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      setError("Error al actualizar perfil. Intentelo de nuevo.");

    };

    window.location.href = "/";
  };


  return (
    <>
      <div className="main-container">

        <VolverAtras hasNavbar={true} />

        <h2 id="editar-titulo">Editar Perfil</h2>

        <form className="formulario-editar-perfil" onSubmit={handleSubmit}>

          {/* NOMBRE COMPLETO */}
          <label htmlFor="nombre">Nombre completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombreCompleto"
            placeholder="Ingresa tu nombre completo"
            value={editData.nombreCompleto}
            onChange={handleChange}
            required
          />


          {/* EMAIL */}
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu correo electronico"
            value={editData.email}
            onChange={handleChange}
            required
          />


          {/* CONTRASEÑA */}
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={editData.password}
            onChange={handleChange}
            required
          />


          {/* FECHA DE NACIMIENTO */}
          <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fecha"
            value={editData.fecha}
            onChange={handleChange}
            required
          />


          {/* FOTO DE PERFIL */}
          <label htmlFor="fotoPerfil">Foto de perfil:</label>
          <input
            type="file"
            id="fotoPerfil"
            name="foto"
            value={editData.foto}
            onChange={handleChange}
            //required
          />

          <button type="submit">Guardar</button>
        </form>


        {perfilActualizado && (
          <div id="message-sent" style={{ color: 'green', marginTop: '10px' }}>
            <h3>Perfil actualizado con exito!</h3>
          </div>
        )}

        {error && (
          <div id="message-sent" style={{ color: 'red', marginTop: '10px' }}>
            <h3>{error}</h3>
          </div>
        )}

      </div>
    </>
  );
};

export default EditarPerfil;