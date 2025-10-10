import "./AlertaCustom.css";
import { useNavigate } from "react-router-dom";



interface AlertaCustomProps {
  mensaje: string;
  onLogin: () => void;
  onRegistro: () => void;
  onCerrar: () => void;
}

const AlertaCustom: React.FC<AlertaCustomProps> = ({ mensaje, onCerrar }) => {
  const navigate = useNavigate();


  return (
    <>
      <div className="overlay">
        <div className="alerta">
          <h3>Atención</h3>
          <p>{mensaje}</p>

          <div className="botones">
            <button onClick={() => navigate("/login")}>Iniciar sesión</button>
            <button onClick={() => navigate("/registro")}>Registrarme</button>
          </div>

          <button className="cerrar" onClick={onCerrar}>×</button>
        </div>
      </div>
    </>
  );
};

export default AlertaCustom;
