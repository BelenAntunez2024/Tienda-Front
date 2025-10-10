import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

const Login = () => {

    const navigate = useNavigate();
    const [emailIngresado, setEmailIngresado] = useState(""); //guarda lo que escribe el usuario
    const [passwordIngresado, setPasswordIngresado] = useState("");
    const [error, setError] = useState(""); //para mostrar errores de validacion


    //Función para manejar el submit del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email:", emailIngresado);

        //reordené algunas cositas porque no estaban funcionando bien y puse comentarios para que se entienda mejor - ahora se valida si el usuario existe antes de hacer el login


        //Simulación JSON con LocalStorage para usuarios ya registrados
        const usuarios = JSON.parse(localStorage.getItem("Usuarios") || "[]");
        //busca si el usuario y email existen antes de hacer el login
        const usuarioExistente = usuarios.find((u: any) => u.email === emailIngresado); 

        //Validaciones: campos vacíos y formato de email
        if (!emailIngresado || !passwordIngresado) {
            setError("Todos los campos son obligatorios");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(emailIngresado)) {
            setError("El email no es válido");
            return;
        }
        //valida si el usuario existe
        if (!usuarioExistente) {
            setError("No existe un usuario con este email");
            //navigate("/registro"); //redirecciona a registro si el usuario no existe
            //comento eso porque no me parece buena idea redireccionar automáticamente, mejor que el usuario decida
            return;
        }
        //verifica si la contraseña es correcta - la validación de contraseña estaba comentada, la descomenté
        if (usuarioExistente.password !== passwordIngresado) {
            setError("Contraseña incorrecta");
            return;
        }

        //si todo está bien, se hace el login y redirecciona a la página principal
        setError("");
        alert("Login exitoso");

        //AGREGADO: localStorage para simular login y mantener/guardar estado de usuario logueado
        localStorage.setItem(
            "usuarioLogueado",
            JSON.stringify({ email: emailIngresado })
        );

        //redirecciona a la página principal después del login
        navigate("/");
    }


    //Función para recuperar contraseña
    function handleforgotPassword() {
        const email = prompt("Ingresa tu email para recuperar la contraseña:");//pide mail al usuario

        const usuarios = JSON.parse(localStorage.getItem("Usuarios") || "[]");
        const usuario = usuarios.find((u: any) => u.email === email);

        //valida si el usuario existe
        if (!usuario) {
            alert("No se encontró un usuario con ese email");
            return;
        }

        //si el usuario existe, permite cambiar la contraseña
        const nuevaPassword = prompt("Ingresa tu nueva contraseña (mínimo 6 caracteres):");

        //valida la nueva contraseña
        if (!nuevaPassword || nuevaPassword.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        //actualiza la contraseña del usuario
        usuario.password = nuevaPassword;
        //guarda los cambios en localStorage
        localStorage.setItem("Usuarios", JSON.stringify(usuarios));

        //muestra mensaje de éxito
        alert("Contraseña actualizada exitosamente. Ahora puedes iniciar sesión con la nueva contraseña.");
    }



    return (
        <main>
            <div>
                <img src="/public/logo.png" alt="logo" id="Logo" />
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

                <button type="submit" onClick={handleSubmit}>Login</button> 
                <a href="#" id="editPassword" onClick={handleforgotPassword}>Olvidaste tu contraseña?</a>
            </form>
        </main>

    );
};
export default Login;