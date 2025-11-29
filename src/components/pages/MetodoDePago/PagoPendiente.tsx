import { useSearchParams } from 'react-router-dom';

function PagoPendiente() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Pago Pendiente</h1>
      <p>Tu pago está siendo procesado.</p>
      {paymentId && <p>ID de pago: {paymentId}</p>}
      <p>Recibirás una confirmación por correo electrónico una vez que se complete el proceso.</p>
      <a href="/">Volver al inicio</a>
    </div>
  );
}

export default PagoPendiente;