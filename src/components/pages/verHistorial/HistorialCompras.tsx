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
        { name: "Amuleto protector", amount: 1, unitPrice: 100, descripcion: "Protege contra energias negativas", image: "https://i.pinimg.com/1200x/18/e9/90/18e9906cb73682dd41faf5b3fee65ed4.jpg" },
        { name: "Vela negra", amount: 2, unitPrice: 25, descripcion: "Vela para rituales de proteccion", image: "http://i.pinimg.com/736x/4d/3d/22/4d3d223dc0b66d9aa9c8a07874696c49.jpg" },
      ],
    },
    {
      id: 2,
      date: "2025-09-15",
      total: 200,
      metodoPago: "Mercado Pago",
      items: [
        { name: "Libro esoterico", amount: 1, unitPrice: 200, descripcion: "Guia de hechizos antiguos", image: "https://i.pinimg.com/736x/a3/78/89/a378893edeb6b771e38ecd7105d0e9bc.jpg" },
      ],
    },
    {
      id: 3,
      date: "2025-09-20",
      total: 75,
      metodoPago: "Efectivo",
      items: [
        { name: "Cristal cuarzo", amount: 3, unitPrice: 25, descripcion: "Cristal para meditacion y energia positiva", image: "https://i.pinimg.com/736x/c4/bf/f5/c4bff5269ed745454d6e7b7c8356e8f2.jpg" },
      ],
    },
    {
      id: 4,
      date: "2025-09-22",
      total: 180,
      metodoPago: "Tarjeta de débito",
      items: [
        { name: "Incienso de sandalo", amount: 2, unitPrice: 40, descripcion: "Incienso para limpieza energetica", image: "http://i.pinimg.com/736x/04/8f/51/048f519aa4e409cd712d9d2ed2a6878c.jpg" },
        { name: "Aceite esencial", amount: 1, unitPrice: 100, descripcion: "Aceite para rituales de purificacion", image: "https://i.pinimg.com/736x/4a/11/94/4a11944adcb9fdd5705db78a36573e74.jpg" },
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
            <li key={compra.id} className="li-compra">
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
                  <div className="info-texto">
                    <p className="item-info">{item.name} - {item.amount} por ${item.unitPrice} <br />
                      {item.descripcion} <br />
                      Subtotal: ${item.amount * item.unitPrice} <br />
                      ------------------------------
                    </p>
                  </div>
                  <div className="info-imagen">
                    {item.image && <img src={item.image} alt={item.name} />}
                  </div>
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
