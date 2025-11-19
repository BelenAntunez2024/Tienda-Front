import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';

interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
}

interface PagosMPProps {
  productos: Producto[];
  email: string;
}

function pagosMP({ productos, email }: PagosMPProps) {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_PUBLIC_KEY);
  }, []);

  const pagar = async () => {
    try {
      const res = await fetch("http://localhost:3000/mercado-pago/crear-preferencia", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productos, email }),
      });
      if (!res.ok) {
        throw new Error('Error al crear la preferencia');
      }
      const data = await res.json();
      setPreferenceId(data.preferenceId);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  return (
    <div>
      <button onClick={pagar}>Pagar</button>
      {error && <p>Error: {error}</p>}
      {preferenceId && (
        <Wallet initialization={{ preferenceId }} />
      )}
    </div>
  );
}

export default pagosMP;
