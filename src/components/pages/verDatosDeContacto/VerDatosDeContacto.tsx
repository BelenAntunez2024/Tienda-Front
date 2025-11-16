/*Mostrar dire, email,redes, horarios, q&a */

import IconEnvelope from "../../icons/IconEnvelope";
import IconIG from "../../icons/IconIG";
import IconLocation from "../../icons/IconLocation";
import IconChat from "../../icons/IconChat";
import IconFacebook from "../../icons/IconFacebook";
import IconWsp from "../../icons/IconWsp";
import { useState } from "react";

const VerDatosDeContacto = () => {
    const [mensaje, setMensaje] = useState(""); // contenido del mensaje
    const [emailIngresado, setEmailIngresado] = useState('');
    const [tipoConsulta, setTipoConsulta] = useState(""); 
    const [error, setError] = useState(''); //para mostrar errores de validacion
    const [mensajeEnviado, setMensajeEnviado] = useState(false);


    const handleSubmit  = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailIngresado || !mensaje || !tipoConsulta) {
            setError("Todos los campos son obligatorios");
        return;
        }
        if (!/\S+@\S+\.\S+/.test(emailIngresado)) {
            setError("El email no es válido");
            return;
        }
        /*
        // Si pasó validaciones
        setError("");
        setMensajeEnviado(true);
        
        // Limpiar formulario
        setEmailIngresado("");
        setMensaje("");
        setTipoConsulta("");

        // Ocultar mensaje después de 3 segundos
        setTimeout(() => setMensajeEnviado(false), 3000);*/
        
         // Construir el objeto con los nombres correctos para el backend:
        const datos = {
        email: emailIngresado,
        clasificacion_mjs: tipoConsulta.toLowerCase(), // en minúscula según tu ENUM
        mensaje
       };

       try{
        const response = await fetch("http://localhost:3000/correo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
       });

        if (!response.ok) 
            throw new Error ("Error al enviar el mensaje");
        setMensajeEnviado(true);
        setEmailIngresado("");
        setMensaje("");
        setTipoConsulta("");
        setTimeout(() => setMensajeEnviado(false), 3000);

        }catch(err){
            setError("Error al enviar el mensaje.");
        }
        
    }
   
    return (
        <main>
                <h1>Quienes somos</h1>
                <div className="contactContainer">
                    <div className="seccion1">
                        <div className="info">
                            <p>
                                <strong>Horarios de atención:</strong> 
                                <br />
                                Lunes a Viernes de 10:00 a 18:00 hs. Sábados de 10:00 a 14:00hs.
                                <br/>
                                Tienda Online abierta las 24hs
                            </p>
                            <p>
                                <IconEnvelope/>
                                TiendaWisteria666@gmail.com
                            </p>
                            <p>
                                <IconLocation/>
                                Estamos ubicados en <strong>Rojas 86, Monte Grande</strong>
                            </p>
                            <div className="mapContainer">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.5673687244266!2d-58.47164022520004!3d-34.816824768782425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd16401a147bf%3A0xe169b57e37f4135a!2sA.%20Rojas%2066%2C%20B1842ACB%20Monte%20Grande%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1759792124535!5m2!1ses-419!2sar" 
                                    width="100%" 
                                    height="100%" 
                                    style={{border:0}}
                                    allowFullScreen
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade">
                                    </iframe>
                            </div>

                            <div>
                                <strong>Contactanos por nuestras redes: </strong>
                                <br/>
                                <a href="http://" className="icons"><IconIG/></a> 
                                <a href="http://" className="icons"><IconFacebook/></a>
                                <a href="http://" className="icons"><IconWsp/></a>
                            </div>
                        </div>
                    </div>
                    <div className="seccion2">
                        
                        <div>
                            <h2>¿Necesitas ayuda?</h2>
                            <h4>
                                Contactanos!
                            </h4>
                        </div>
                        <div className="formContainer">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group icon-input">
                                    <label htmlFor="email">Email</label>
                                    <div className="input-wrapper">
                                        <input 
                                            type="text" 
                                            placeholder="Ingresa tu email" 
                                            className="input_text" 
                                            value={emailIngresado}
                                            onChange={(e) => setEmailIngresado(e.target.value)} 
                                        />
                                        <span className="input-icon">
                                            <IconEnvelope/>
                                        </span>
                                    </div>
                                </div>
                                <p className="tipoConsulta">Seleccione el tipo de consulta</p>
                                <div className="btnContainer">
                                    {["Consulta", "Reclamo", "Otra"].map((tipo) => (
                                        <button
                                        type="button"
                                        className="consultaTipo-btn"
                                        key={tipo}
                                        onClick={() => setTipoConsulta(tipo)} 
                                        >
                                        {tipo}
                                        </button>
                                    ))}

                                </div>
                                <div className="form-group icon-input">
                                    <label htmlFor="message">Mensaje:</label>
                                    <div className="input-wrapper">
                                        <input
                                            type="text"
                                            id="message"
                                            name="mensaje"
                                            placeholder="Ingrese su mensaje"
                                            value={mensaje}
                                            onChange={(e) => setMensaje(e.target.value)}
                                            />
                                        <span className="input-icon">
                                        <IconChat/>
                                        </span>
                                    </div>
                                </div>

                                {error && (
                                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                                )}

                                <button type="submit" id="formBtn">Enviar</button>
                                <div id="mensaje-enviado" style={{ display: mensajeEnviado ? "block" : "none" }}>
                                    <p>Se envio correctamente! En breve nos comunicaremos contigo.</p>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            
        </main>
    );
}

export default VerDatosDeContacto;
