import { useSearchParams } from 'react-router-dom';

function PagoFallido() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Pago Fallido</h1>
      <p>Lo sentimos, tu pago no pudo ser procesado.</p>
      {paymentId && <p>ID de pago: {paymentId}</p>}
      <p>Por favor, intenta nuevamente o contacta a soporte.</p>
      <a href="/funcionalidadCarrito">Volver al carrito</a>
    </div>
  );
}

export default PagoFallido;