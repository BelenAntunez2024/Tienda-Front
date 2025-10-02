import "./HistorialCompras.css";
import { useState } from "react";
import type { Compra } from "./interfaces/compra";


const HistorialCompras: React.FC = () => {

  //compras de ejemplo
  const [compras] = useState<Compra[]>([
    {
      id: 1,
      date: "2025-09-10",
      total: 150,
      metodoPago: "Tarjeta de credito",
      items: [
        { name: "Amuleto protector", amount: 1, unitPrice: 100, descripcion: "Protege contra energias negativas" },
        { name: "Vela negra", amount: 2, unitPrice: 25, descripcion: "Vela para rituales de proteccion" },
      ],
    },
    {
      id: 2,
      date: "2025-09-15",
      total: 200,
      metodoPago: "Mercado Pago",
      items: [
        { name: "Libro esoterico", amount: 1, unitPrice: 200, descripcion: "Guia de hechizos antiguos" },
      ],
    },
    {
      id: 3,
      date: "2025-09-20",
      total: 75,
      metodoPago: "Efectivo",
      items: [
        { name: "Cristal cuarzo", amount: 3, unitPrice: 25, descripcion: "Cristal para meditacion y energia positiva" },
      ],
    },
    {
      id: 4,
      date: "2025-09-22",
      total: 180,
      metodoPago: "Tarjeta de débito",
      items: [
        { name: "Incienso de sandalo", amount: 2, unitPrice: 40, descripcion: "Incienso para limpieza energetica" },
        { name: "Aceite esencial", amount: 1, unitPrice: 100, descripcion: "Aceite para rituales de purificacion" },
      ],
    },
  ]);

  const [compraSeleccionada, setCompraSeleccionada] = useState<Compra | null>(null);

  return (
    <>
      <div className="container-historial">
        <h1>Historial de Compras</h1>
        <ul>
          {/*recorre y muestra en la lisa las compras */}
          {compras.map((compra) => (
            <li key={compra.id}>
              <strong>Compra #{compra.id}</strong>  {compra.date} - Total: ${compra.total}
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
            <h2>Detalles de la compra #{compraSeleccionada.id}</h2>
            <ul>
              {compraSeleccionada.items.map((item, index) => (
                <li key={index} className="li-detalles">
                  {item.name} - {item.amount} por ${item.unitPrice} <br />
                  {item.descripcion} <br />
                  Subtotal: ${item.amount * item.unitPrice}
                </li>
              ))}
            </ul>
            <p>
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
