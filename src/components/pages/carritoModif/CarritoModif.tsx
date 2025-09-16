import React, {useState} from "react";

interface Producto{
    id: number;
    NombreProducto: string;
    Precio: number;
    Cantidad: number;

}

const Carrito: React.FC = () =>{
    const [carrito,setCarrito] = useState <Producto[]>([
        {id:1, NombreProducto: "Vela Negra", Precio: 3000, Cantidad: 10 },
        {id:2, NombreProducto: "Cristal Mistico", Precio: 6000, Cantidad: 20 },
        {id:3, NombreProducto: "Cristal Amatista", Precio: 6500, Cantidad: 25 }
    ]);

    //Carlcular subtotal y total.
    const calcularTotal = () => carrito.reduce((acc,p) => acc + p.Precio * p.Cantidad, 0);

    const modificarCantidad = (id:number, delta:number) =>{
        setCarrito ((prev)=>
        prev.map((p) =>
         p.id === id ? {
            ...p, Cantidad: Math.max(1, p.Cantidad + delta) } 
            : p
        )
      );
    };

    //Vaciar carrito
    const vaciarCarrito = () =>{
        if (carrito.length === 0) 
            return;
     const confirmar = window.confirm("¿Estas seguro de varoa el carrito?");
        if (confirmar){
            setCarrito([]);
            alert("El carrito vaciado con exito");
        }
    };
    return(
        <div className="carrito-containes">
        <h2>Carrito</h2>
        {carrito.length === 0? (
         <p>El carrito esta vacio</p>
          ) : (
            carrito.map((p) =>(
                <div key={p.id} className="producto-carrito">
            <span>
              {p.NombreProducto} (${p.Precio})
            </span>
            <div>
              <button onClick={() => modificarCantidad(p.id, -1)}>-</button>
              <span className="cantidad">{p.Cantidad}</span>
              <button onClick={() => modificarCantidad(p.id, 1)}>+</button>
            </div>
            <span>${p.Precio * p.Cantidad}</span>
          </div>
 
        ))
    )}
  <h3>Total: ${calcularTotal()}</h3>

 {/* Botón visible solo si hay productos */}
  {carrito.length > 0 &&(
    <button className="btn-vaciar" onClick={vaciarCarrito}> Vaciar Carrito </button>
  )}
 </div>
 );
};
 export default Carrito;