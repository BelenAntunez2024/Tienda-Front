import "./HistorialCompras.css";
import { useEffect, useState } from "react";
import type { Compra } from "./interfaces/compra";
import { jwtDecode } from "jwt-decode";


const HistorialCompras: React.FC = () => {

  //compras de ejemplo - BORRAR CUANDO ESTE CONECTADO CON BACKEND
  const [compras, setCompras] = useState<Compra[]>([]);
  const [compraSeleccionada, setCompraSeleccionada] = useState<Compra | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        setLoading(true);
        // Obtén el token desde donde lo tengas guardado
        const token = localStorage.getItem("token") || ""; // o desde context, state, etc.
        const decoded: any = jwtDecode(token);
        const userId = decoded.id || decoded.Id_usuario || decoded.sub;

        const response = await fetch(`http://localhost:3000/ordenes/historial/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Incluye el token en el encabezado Authorization
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        //esto mapea la respuesta del backend al formato esperado en el frontend
        const comprasMapeadas: Compra[] = data.map((orden: any) => ({
          id_orden: orden.id_orden,
          fecha: orden.fecha,
          total: orden.total,
          metodoPago: orden.metodoPago ?? null, // opcional
          //mapeamos itemOrdenes del backend a items del frontend
          items: orden.itemOrdenes.map((item: any) => ({
            nombre: item.producto.nombre,
            cantidad: item.cantidad_productos,
            precioUnitario: item.producto.precio,
            descripcion: item?.producto?.descripcion ?? "Sin descripción",
            id_producto: item?.producto?.id_producto ?? undefined, //opcional
          })),
        }));

        setCompras(comprasMapeadas);

        console.log("Compras transformadas:", comprasMapeadas);

        setError(null);
      } catch (err) {
        setError(null);
        console.error("Error al consultar compras:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, []);

  if (loading) return <div>Cargando...</div>; //agregar estilos
  if (error) return <div>Error: {error}</div>;




  return (
    <>
      <div className="container-historial">
        <h1>Historial de Compras</h1>

        {compras.length === 0 && !loading &&(
          <p className="sin-compras">
            Todavía no realizaste una compra.
          </p>
        )}

        <ul>
          {/*recorre y muestra en la lisa las compras */}
          {compras.map((compra) => (
            <li key={compra.id_orden}>
              <strong>Compra #</strong>  {compra.fecha} - Total: ${compra.total}
              <button
                className="btn-historial-detalles"
                onClick={() => setCompraSeleccionada(compra)}
              >
                Ver detalles
              </button>
            </li>
          ))}
        </ul>


        {compraSeleccionada && (
          <div className="detalles-compra">
            <h2>Detalles de la compra</h2>
            <ul>
              {compraSeleccionada.items.map((item) => (
                <li 
                key={item.id_producto} 
                className="li-detalles"
                >
                  {item.nombre} - {item.cantidad} por ${item.precioUnitario} <br />
                  {item.descripcion} <br />
                  Subtotal: ${item.cantidad * item.precioUnitario}
                </li>
              ))}
            </ul>

            <p className="total-compra">
              <strong>Metodo de pago:</strong> {compraSeleccionada.metodoPago} <br />
              <strong>Total:</strong> ${compraSeleccionada.total}
            </p>
            
            <button
              className="btn-cerrar"
              onClick={() => setCompraSeleccionada(null)}>
              Cerrar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HistorialCompras;
