import './Login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !contraseña) {
            setError("Todos los campos son obligatorios");
            return;
        }

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

            alert("Login exitoso");
            navigate("/");

        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            setError("Error al iniciar sesión. Verificá tus credenciales.");
        }
    };

    const handleForgotPassword = () => {
        const email = prompt("Ingresa tu email para recuperar la contraseña:");
        const usuarios = JSON.parse(localStorage.getItem("Usuarios") || "[]");
        const usuario = usuarios.find((u:any) => u.email === email);

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
        <main>
            <div>
                <img src="/public/logo.png" alt="logo" id="Logo" />
                <img src="/public/logo.png" alt="logo" id="Logo" />
            </div>
            <h1>Wisteria</h1>

            <form className="formContainer" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Ingresa tu email"
                        className="input_text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        className="input_text"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
                {error && <p className="error">{error}</p>}
            </form>

            <button onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</button>
        </main>
    );
};

export default Login;