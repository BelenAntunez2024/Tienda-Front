import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function PagoExitoso() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    //Esto es para limpiar el carrito o realizar otras acciones post-pago
    localStorage.removeItem('emailCompra');
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>¡Pago Exitoso!</h1>
      <p>Tu compra ha sido procesada correctamente.</p>
      {paymentId && <p>ID de pago: {paymentId}</p>}
      <p>Recibirás un correo electrónico con los detalles de tu compra.</p>
      <a href="/">Volver al inicio</a>
    </div>
  );
}

export default PagoExitoso;