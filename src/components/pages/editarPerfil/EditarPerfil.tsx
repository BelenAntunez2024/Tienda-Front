import { jwtDecode } from "jwt-decode";
import VolverAtras from "../../layout/VolverAtras";
import "./EditarPerfil.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const EditarPerfil = () => {
  const navigate = useNavigate();
  //HOOKS DE ESTADO
  const [editData, setEditData] = useState({ //guarda los datos del form
        nombreCompleto: "",
        email: "",
        password: "",
        fechaNacimiento: "",
        foto: ""
    });

  const [perfilActualizado, setPerfilActualizado] = useState(false); //para mostrar mensaje de exito
  const [error, setError] = useState(""); //para mostrar errores de validacion
   
  
  useEffect(() => {
  const cargarDatosUsuario = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/auth/perfil`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEditData({
          nombreCompleto: data.nombreCompleto || "",
          email: data.email || "",
          password: "",
          fechaNacimiento: data.fechaNacimiento || "",
          foto: data.foto || "",
        });
      } else {
        setError("Error al cargar datos del usuario.");
      }
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("Error al cargar datos del usuario.");
    }
  };
  cargarDatosUsuario();
}, []);
  
//HANDLERS DE CAMBIO actualiza los datos del usuario al escribir en los imputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  //HANDLER DE ENVIO
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
      const token = localStorage.getItem('token') || '';
      const decoded: any = jwtDecode(token);
      const userId = decoded.id || decoded.Id_usuario || decoded.sub;
    // Validaciones
     if (editData.email && !/\S+@\S+\.\S+/.test(editData.email)) {
    setError("El email no es válido");
    return;
  }
  if (editData.password && editData.password.length < 6) {
    setError("La contraseña debe tener al menos 6 caracteres");
    return;
  }
   try {
    const body: any = {};
    // Solo incluye campos que no estén vacíos (asumiendo que vacíos no se actualizan)
    if (editData.nombreCompleto) body.nombreCompleto = editData.nombreCompleto;
    if (editData.email) body.email = editData.email;
    if (editData.password) body.password = editData.password;
    if (editData.fechaNacimiento) body.fechaNacimiento = editData.fechaNacimiento;
    if (editData.foto) body.foto = editData.foto;

    const response = await fetch(`http://localhost:3000/usuario/${userId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    setPerfilActualizado(true);
    console.log("Datos actualizados:", data);
  } catch (err) {
    console.error("Error al actualizar perfil:", err);
    setError("Error al actualizar perfil. Inténtelo de nuevo.");
  }
  setTimeout(() => {
      setPerfilActualizado(false);
      navigate("/perfil");
  }, 3000);
};
  return (
    <>
      <div className="main-container-editar-perfil">
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
          />
          {/* FECHA DE NACIMIENTO */}
          <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={editData.fechaNacimiento}
            onChange={handleChange}
          />
          {/* FOTO DE PERFIL */}
          <label htmlFor="fotoPerfil">Foto de perfil:</label>
          <input
            type="file"
            id="fotoPerfil"
            name="foto"
            value={editData.foto}
            onChange={handleChange}
          />
          <button type="submit">Guardar</button>
        </form>
        {perfilActualizado && (
          <div id="alerta-exito" >
            <h3>Perfil actualizado con exito!</h3>
          </div>
        )}
        {error && (
          <div id="message-sent" style={{color: 'red', marginTop: '10px' }}>
            <h3>{error}</h3>
          </div>
        )}
      </div>
    </>
  );
};
export default EditarPerfil;