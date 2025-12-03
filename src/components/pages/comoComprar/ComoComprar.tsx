import React from "react";
import "./ComoComprar.css";
import VolverAtras from "../../layout/VolverAtras";

const pasos = [
  { icon: "🛍️", titulo: "Explora y Añade al Carrito", texto: "navega por nuestro catalogo o busca lo que mas te guste. Agrega tus productos favoritos al carrito." },
  { icon: "🧾", titulo: "Revisa tu Pedido", texto: "Verifica los productos, cantitades y modelos antes de continuar con tu compra." },
  { icon: "✍️", titulo: "Datos del Contacto", texto: "Inicia sesion o registrate para confirmar tu compra." },
  { icon: "📦", titulo: "Direccion y Envio", texto: "Completa tu direccion y elegi el metodo de envio que prefieres." },
  { icon: "💳", titulo: "Selecciona el Pago", texto: "Elegi tu medio de pago favorito y aplica tus descuentos si tenes uno." },
  { icon: "✅", titulo: "Confirma tu Compra", texto: "Revisa todos los datos y luego, confirma tu compra." },
  { icon: "📩", titulo: "Recibi la Confirmacion", texto: "Te enviaremos un correo con los detalles y el seguimiento de tu pedido." }
];

const ComoComprar: React.FC = () => {
  return (
    <>
      <VolverAtras hasNavbar={true} />

      <section className="como-comprar">
        <h2 className="titulo-wisteria">✨ Cómo Comprar en Wisteria ✨</h2>
        <p className="intro">
          Queremos que tu experiencia de comprar sea magica, con confianza y sencilla.
          Segui estos pasos y recibi tus productos.
        </p>
        <div className="timeline">
          {pasos.map((p, index) => (
            <div className="paso" key={index}>
              <div className="circulo">
                <span className="icono">{p.icon}</span>
                <div className="destello"></div>
              </div>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
              {index < pasos.length && <div className="linea" />}
            </div>
          ))}
        </div>
        <section className="pagos">
          <h2>Metodos de pago y seguridad</h2>
          <p>Aceptamos los principales medios de pago con total seguridad:</p>
          <div className="logos-pago">
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/mercadopago.png"
              className="footer__top__icon" alt="Medio Pago"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/mastercard.png"
              className="footer__top__icon" alt="Medio Pago"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/visa.png"
              className="footer__top__icon" alt="Medio Pago"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/deposito.png"
              className="footer__top__icon" alt="Medio Pago"></img>
            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/efectivo.png"
              className="footer__top__icon" alt="Medio Pago"></img>
          </div>
          <p className="detalle-pago">
            Tambien podes pagar con transferencia bancaria. <br />
            Nuestra plataforma esta protegida con cifrado seguro.</p>
        </section>
        <section className="devoluciones">
          <h2 className="devolucion-titulo"> Cambios y Devoluciones </h2>
          <p className="p-como-comprar"> Tenes hasta 20 dias desde que recibis el producto para solicitar un cambio o devolucion. <br />
            El producto debe estar sin uso, con sus respectivas etiquetas y en su embalaje original.
          </p>
          <button className="btn-politica">Ver Politica Completa</button>
        </section>

      </section>
    </>
  );
};

export default ComoComprar;