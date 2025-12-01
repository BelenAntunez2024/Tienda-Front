import IconEnvelope from "../../icons/IconEnvelope";
import IconIG from "../../icons/IconIG";
import IconLocation from "../../icons/IconLocation";
import IconChat from "../../icons/IconChat";
import IconFacebook from "../../icons/IconFacebook";
import IconWsp from "../../icons/IconWsp";
import './DatosDeContacto.css';
import { useState } from "react";
import "./DatosDeContacto.css";
import VolverAtras from "../../layout/VolverAtras";

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

        const datos = {
            email: emailIngresado,
            clasificacion_mjs: tipoConsulta.toLowerCase(), // en minúscula según tu ENUM
            mensaje
        };

        try {
            const response = await fetch("http://localhost:3000/correo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            if (!response.ok)
                throw new Error("Error al enviar el mensaje");
            setMensajeEnviado(true);
            setEmailIngresado("");
            setMensaje("");
            setTipoConsulta("");
            setTimeout(() => setMensajeEnviado(false), 3000);

        } catch (err) {
            setError("Error al enviar el mensaje.");
        }

    }

    return (
        <>
            <div className="volver-atras-contacto">
                <VolverAtras hasNavbar={true}/>
            </div>
            <h1 className="contacto-titulo">Quienes somos</h1>
            <div className="contactContainer">
                <div className="seccion1-contacto">
                    <div className="info-contacto">
                        <p>
                            <h3>Horarios de atención:</h3>
                            <br />
                            Lunes a Viernes de 10:00 a 18:00 hs.
                            <br />
                            Sábados de 10:00 a 14:00hs.
                            <br />
                            Tienda Online abierta las 24hs
                        </p>
                        <p>
                            <IconEnvelope />
                            TiendaWisteria666@gmail.com
                        </p>
                        <p>
                            <IconLocation />
                            Estamos ubicados en <strong>Rojas 86, Monte Grande</strong>
                        </p>
                        <div className="mapContainer">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.5673687244266!2d-58.47164022520004!3d-34.816824768782425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd16401a147bf%3A0xe169b57e37f4135a!2sA.%20Rojas%2066%2C%20B1842ACB%20Monte%20Grande%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1759792124535!5m2!1ses-419!2sar"
                                style={{
                                    border: 0,
                                    borderRadius: '8px',
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>

                        <div >
                            <strong className="redes-contacto">Contactanos por nuestras redes: </strong>
                            <br />
                            <a href="http://" className="icons-contacto"><IconIG /></a>
                            <a href="http://" className="icons-contacto"><IconFacebook /></a>
                            <a href="http://" className="icons-contacto"><IconWsp /></a>
                        </div>
                    </div>
                </div>
                <div className="seccion2-contacto">

                    <div>
                        <h2>¿Necesitas ayuda?</h2>
                    </div>
                    <div className="formContainer-contacto">
                        <h4>
                            ¡Contactanos!
                        </h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group-contacto icon-input-contacto">
                                <label htmlFor="email" className="label-contacto">Email</label>
                                <div className="input-wrapper-contacto">
                                    <input
                                        type="text"
                                        placeholder="Ingresa tu email"
                                        className="input_text"
                                        value={emailIngresado}
                                        onChange={(e) => setEmailIngresado(e.target.value)}
                                    />
                                    <span className="input-icon-contacto">
                                        <IconEnvelope />
                                    </span>
                                </div>
                            </div>
                            <p className="tipoConsulta">Seleccione el tipo de consulta</p>
                            <div className="btnContainer-contacto">
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
                            <div className="form-group-contacto icon-input-contacto">
                                <label htmlFor="message" className="label-contacto">Mensaje:</label>
                                <div className="input-wrapper-contacto">
                                    <input
                                        type="text"
                                        id="message"
                                        name="mensaje"
                                        placeholder="Ingrese su mensaje"
                                        value={mensaje}
                                        onChange={(e) => setMensaje(e.target.value)}
                                    />
                                    <span className="input-icon-contacto">
                                        <IconChat />
                                    </span>
                                </div>
                            </div>

                            {error && (
                                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                            )}

                            <button type="submit" className="formBtn">Enviar</button>
                            <div id="mensaje-enviado" style={{ display: mensajeEnviado ? "block" : "none" }}>
                                <p>Se envio correctamente! En breve nos comunicaremos contigo.</p>

                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default VerDatosDeContacto;
