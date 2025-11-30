import { Link } from "react-router-dom";
import "./footer.css"

const Footer = () => {
  return (
    <footer>
      <div className="email-subscribe">
        <p>Dejanos tu mail para recibir novedades</p>
        <div className="subscribe-form">
          <input type="email" placeholder="Tu email" className="input-footer"/>
          <button>Registrate</button>
        </div>
      </div>

      <hr />

      {/* Main secciones: Payment, Social, Contact */}
      <div className="footer-sections">
        <div className="footer-section">
          <h4 className="footer-title">Medios de pago</h4>
          <div className="pagos-icons">
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/mercadopago.png" 
            className="footer__top__icon" alt="Medio Pago"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/mastercard.png" 
            className="footer__top__icon" alt="Medio Pago"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/visa.png" 
            className="footer__top__icon" alt="Medio Pago"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/pagofacil.png" 
            className="footer__top__icon" alt="Medio Pago"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/rapipago.png" 
            className="footer__top__icon" alt="Medio Pago"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/deposito.png" 
            className="footer__top__icon" alt="Medio Pago"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/efectivo.png" 
            className="footer__top__icon" alt="Medio Pago"></img>

          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Medios de envío</h4>
          <div className="medios-icons">
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-envio/oca.png" 
            className="footer__top__icon" alt="Medio Envio"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-envio/andreani.png"
            className="footer__top__icon" alt="Medio Envio"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-envio/correo-argentino.png" 
            className="footer__top__icon" alt="Medio Envio"></img>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h4 className="footer-title">Nuestras redes sociales</h4>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-info">
          <h4 className="footer-title">Contacto</h4>
          <p className="contact-p">TiendaWisteria666@gmail.com</p>
          <p className="contact-p">Rojas 86, Monte Grande</p>
          <Link to="/contacto">
              <button className="footer-button" >Botón de arrepentimiento</button>
          </Link>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
