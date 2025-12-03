import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VolverAtras from '../../layout/VolverAtras';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");
    const [loginExitoso, setLoginExitoso] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !contraseña) {
            setError("Todos los campos son obligatorios");
            return;
        }
        console.log("Enviando datos de login:", { email, contraseña });
        console.log("Enviando datos de login:", { email, contraseña });
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password: contraseña }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);

            setLoginExitoso(true);
            setTimeout(() => {
                setLoginExitoso(false);
                navigate("/");
            }, 3000);

        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            setError("Error al iniciar sesión. Verificá tus credenciales.");
        }
    };

    const handleForgotPassword = () => {
        const email = prompt("Ingresa tu email para recuperar la contraseña:");
        const usuarios = JSON.parse(localStorage.getItem("Usuarios") || "[]");
        const usuario = usuarios.find((u: any) => u.email === email);

        if (!usuario) {
            alert("No se encontró un usuario con ese email");
            return;
        }

        const nuevaPassword = prompt("Ingresa tu nueva contraseña (mínimo 6 caracteres):");
        if (!nuevaPassword || nuevaPassword.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        usuario.password = nuevaPassword;
        localStorage.setItem("Usuarios", JSON.stringify(usuarios));
        alert("Contraseña actualizada exitosamente.");
    };

    return (
        <div className='main-container-login'>
            <VolverAtras />
            <div>
                <img src="/img/logo.png" alt="logo" id="Logo" />
            </div>
            <h1 className="login-titulo">Wisteria</h1>

            <form className="formContainer" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                    />
                </div>
                <button className='iniciarSesion' type="submit" >Iniciar sesión</button>
                {error && <p className="error">{error}</p>}

                <button onClick={handleForgotPassword} className='passwordOlvidada'>¿Olvidaste tu contraseña?</button>

                <div>
                    {loginExitoso && (
                        <div className="alerta-exito">
                            <p>¡Inicio de sesión exitoso! Redirigiendo...</p>
                        </div>
                    )}
                </div>
            </form>

        </div>
    );
};

export default Login;