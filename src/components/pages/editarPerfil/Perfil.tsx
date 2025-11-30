import { useEffect, useState } from "react";
import { Wand2, Mail, User } from "lucide-react";
import "./Perfil.css";
import VolverAtras from "../../layout/VolverAtras";

export default function PerfilUsuario() {
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const obtenerUsuario = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No hay token en localStorage");
        }

        const resp = await fetch(`http://localhost:3000/auth/perfil`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal,
        });

        if (!resp.ok) {
          throw new Error(`Error en la API: ${resp.status}`);
        }

        const data = await resp.json();

        const usuarioNormalizado = {
          nombreCompleto: data.nombreCompleto || data.nombre || "Usuario",
          email: data.email,
          fechaNacimiento: data.fechaNacimiento || data.fecha || "",
          foto: data.foto,
        };

        setUsuario(usuarioNormalizado);
      } catch (err: any) {
        if (err.name === "AbortError") {
          return;
        }
        console.error(err);
        setError("No se pudo cargar el perfil. Verifica que el backend esté corriendo.");
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuario();

    return () => controller.abort();
  }, []);

  if (cargando) {
    return <div className="perfil-cargando">Cargando perfil...</div>;
  }

  return (
    <>
    <VolverAtras hasNavbar={true} />

  <main className="perfil-container">

    <section className="perfil-card">

      {error && (
        <div className="perfil-error">⚠ {error}</div>
      )}

      {/* HEADER: Avatar + Nombre */}
      <header className="perfil-header">
        {usuario?.foto ? (
          <img
            src={usuario.foto}
            alt="Foto de perfil"
            className="perfil-avatar"
          />
        ) : (
          <div className="perfil-avatar perfil-avatar-placeholder">
            <User size={60} />
          </div>
        )}

        <div>
          <h2 className="perfil-nombre">
            {usuario?.nombreCompleto} <Wand2 size={20} />
          </h2>
          <p className="perfil-email"><Mail size={18} /> {usuario?.email}</p>
        </div>
      </header>

      {/* INFORMACIÓN */}
      <div className="perfil-info">
        <h2>Información del Usuario</h2>

        <div className="perfil-info-item">
          <span className="label">Fecha de Nacimiento</span>
          <span>{usuario?.fechaNacimiento}</span>
        </div>

      </div>

      {/* BOTÓN */}
      <div className="perfil-actions">
        <button
          className="perfil-btn"
          onClick={() => (window.location.href = "/editar-perfil")}
        >
          Editar Perfil
        </button>
      </div>

    </section>
  </main>
  </>
);
}

