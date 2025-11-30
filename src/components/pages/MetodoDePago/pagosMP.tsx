import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';

interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
}

function PagosMP() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [email, setEmail] = useState<string>('');
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  //Inicializar Mercado Pago con locale obligatorio
  useEffect(() => {
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    if (!publicKey) {
      setError('Clave pública de MercadoPago no configurada');
      return;
    }

    initMercadoPago(publicKey, { locale: "es-AR" });
  }, []);

  //Obtener productos + email guardado
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token') || '';

        const response = await fetch("https://multiply-thankful-tate.ngrok-free.dev/item-ordenes", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Ngrok-Skip-Browser-Warning': 'true'
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener productos: ${response.status}`);
        }

        const data = await response.json();
        const mappedProductos = data.map((item: any) => ({
          nombre: item.producto.nombre,
          precio: item.producto.precio,
          cantidad: item.cantidad_productos,
        }));

        setProductos(mappedProductos);
      } catch (err) {
        console.error('Error obteniendo productos:', err);
        setError("Error cargando productos");
      }
    };

    // recuperar email
    const emailCompra = localStorage.getItem('emailCompra') || '';
    setEmail(emailCompra);

    fetchProductos();
  }, []);

  //Llamar al backend para crear la preferencia
  const pagar = async () => {
    try {
      const res = await fetch("https://multiply-thankful-tate.ngrok-free.dev/mercado-pago/crear-preferencia", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ngrok-Skip-Browser-Warning': 'true'
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
      {!preferenceId && (
        <button onClick={pagar}>Pagar con Mercado Pago</button>
      )}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {preferenceId && (
        // @ts-ignore
        <Wallet initialization={{ preferenceId }} 
        />
      )}
    </div>
  );
}

export default PagosMP;



