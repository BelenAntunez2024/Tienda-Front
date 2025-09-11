import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [emailIngresado, setEmailIngresado] = useState(""); //guarda lo que escribe el usuario
    const [passwordIngresado, setPasswordIngresado] = useState("");
    const [error, setError] = useState(""); //para mostrar errores de validacion


    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación JSON con LocalStorage
    const usuarios = JSON.parse(localStorage.getItem("Usuarios") || "[]");

    if (!emailIngresado || !passwordIngresado) {
        setError("Todos los campos son obligatorios");
    return;
    }

    if (!/\S+@\S+\.\S+/.test(emailIngresado)) {
        setError("El email no es válido");
        return;
    }
    const usuarioExistente = usuarios.find((u: any) => u.email === emailIngresado); //busca si el email ingresado existe

    if (!usuarioExistente) {
        setError("No existe un usuario con este email");
        navigate("/registro"); //redirecciona a registr
        return;
    }
    if (usuarioExistente.password !== passwordIngresado) {
        setError("Contraseña incorrecta");
        return;
    }
    setError("");
    alert("Login exitoso");
    navigate("/"); //redirecciona a la pagina principal
    }

    function handleforgotPassword() {
    const email = prompt("Ingresa tu email para recuperar la contraseña:");//pide mail al usuario

    const usuarios = JSON.parse(localStorage.getItem("Usuarios") || "[]");
    const usuario = usuarios.find((u:any) => u.email === email);

    if (!usuario) {
        alert("No se encontró un usuario con ese email");
        return;
    }

    const nuevaPassword = prompt("Ingresa tu nueva contraseña (mínimo 6 caracteres):");

    if (!nuevaPassword || nuevaPassword.length < 6) { //valida la nueva contraseña
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    usuario.password = nuevaPassword; //actualiza la contraseña
    localStorage.setItem("Usuarios", JSON.stringify(usuarios));

    alert("Contraseña actualizada exitosamente. Ahora puedes iniciar sesión con la nueva contraseña.");
    }



   return (
        <main>
            <div>
                <img src="/public/logo.png" alt="logo" id="Logo"/>
            </div>
            <h1>Wisteria</h1>

            <form className="formContainer" onSubmit={handleSubmit}>  
                <div>
                    <input 
                        type="text" 
                        placeholder="Ingresa tu email" 
                        className="input_text" 
                        value={emailIngresado}
                        onChange={(e) => setEmailIngresado(e.target.value)} 
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        className="input_text"
                        value={passwordIngresado}
                        onChange={(e) => setPasswordIngresado(e.target.value)} 
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Login</button>

                <a href="#" id="editPassword" onClick={handleforgotPassword}>Olvidaste tu contraseña?</a>
            </form>
        </main>

    );
};
export default Login;