import "./EditarPerfil.css";
import { useState } from "react";

const EditarPerfil = () => {

  //HOOKS DE ESTADO
  const [editData, setEditData] = useState({ //guarda los datos del form
        nombre: "",
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!editData.nombre || !editData.email || !editData.password || !editData.fecha) {
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

    // Simulación JSON con LocalStorage
    const usuarios = JSON.parse(localStorage.getItem("Usuarios") || "[]");
    const usuarioExistente = usuarios.find((u: any) => u.email === editData.email);

    if (usuarioExistente) {
        setError("Ya existe un usuario con este email");
        return;
    }

    usuarios.push(editData);
    localStorage.setItem("Usuarios", JSON.stringify(usuarios));

    setPerfilActualizado(true);
    alert(
        <div style={{ color: "red" }}>
          <h3>Perfil actualizado con exito!</h3>
        </div>
    );

    window.location.href = "/login";
  };


  return (

  //Vista del componente

    <main>
      <section>
        <h2>Editar Perfil</h2>

        <form className="formulario-editar-perfil" onSubmit={handleSubmit}>

          {/* NOMBRE COMPLETO */}
          <label htmlFor="nombre">Nombre completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ingresa tu nombre completo"
            value={editData.nombre}
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
            required
          />

          <button type="submit">Guardar</button>
        </form>


        {perfilActualizado && (
          <div id="message-sent" style={{color: 'green', marginTop: '10px' }}>
            <h3>Perfil actualizado con exito!</h3>
          </div>
        )}

        {error && (
          <div id="message-sent" style={{color: 'red', marginTop: '10px' }}>
            <h3>{error}</h3>
          </div>
        )}

      </section>
    </main>
  );
};

export default EditarPerfil;