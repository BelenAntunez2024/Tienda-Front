import { useState } from "react";
import type { CarritoItem } from "./interfaces/CarritoItem";

const FuncionalidadCarrito = () => {

    const [carrito, setCarrito] = useState<CarritoItem[]>([]);
    
    const actualizarCantidad = async (idItemOrden: number, nuevaCantidad: number) => {
        const token = localStorage.getItem('token') || '';
        const response = await fetch(`http://localhost:3000/item-ordenes/${idItemOrden}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                cantidad_productos: nuevaCantidad,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudo actualizar la cantidad en el servidor.`);
        }
    };

    const eliminar = async (idItemOrden: number) => {
        const token = localStorage.getItem('token') || '';
        
        const response = await fetch(`http://localhost:3000/item-ordenes/${idItemOrden}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Usamos el token para autenticar
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudo eliminar el producto del servidor.`);
        }        
    };

    const eliminarDelCarrito = async (idItemOrden: number, productoId: number) => {
        try {
            await eliminar(idItemOrden); 
            setCarrito(prevCarrito => prevCarrito.filter((item) => item.id_producto !== productoId));
            
            console.log(`Producto eliminado del carrito, ID: ${productoId}`);
            
        } catch (err) {
            console.error("Error al eliminar:", err);
        }
    }

    const restarCantidad = async (productoId: number, idItemOrden: number) => {
        const producto = carrito.find((item) => item.id_producto === productoId); 
        if (!producto) {
            return "El producto no está en el carrito";
        }
        try {
            if (producto.cantidad > 1) {
                const nuevaCantidad = producto.cantidad - 1;
                await actualizarCantidad(idItemOrden, nuevaCantidad);
                
                setCarrito(prevCarrito => prevCarrito.map(item => 
                    item.id_producto === productoId 
                        ? { ...item, cantidad: nuevaCantidad } 
                        : item
                ));
                alert("Cantidad actualizada con éxito.");
            } else if (producto.cantidad === 1) { 
                // Si la cantidad es 1, llamamos a la función de eliminación (DELETE)
                await eliminarDelCarrito(idItemOrden, productoId); 
            }
        } catch (error) {
            console.error("Error al restar cantidad:", error);
        }
    }

    const sumarCantidad = async (productoId: number, idItemOrden: number) => {
        const producto = carrito.find((item) => item.id_producto === productoId); 
        if (!producto) {
            return "El producto no está en el carrito";
        }
        try {
            const nuevaCantidad = producto.cantidad + 1;
            await actualizarCantidad(idItemOrden, nuevaCantidad);

            setCarrito(prevCarrito => prevCarrito.map(item => 
                item.id_producto === productoId 
                    ? { ...item, cantidad: nuevaCantidad } // Actualiza la cantidad
                    : item 
            ));
            alert("Cantidad actualizada con éxito.");
        } catch (error) {
            console.error("Error al sumar cantidad:", error);
        }
    }

    return (
        <main>
            <h1> Carrito </h1>

    <div>
        <h2>Productos elegidos</h2>
        <div>
            {carrito.map((producto) => (
                <div key={producto.id_item_orden}> 
                    <p>
                        {producto.nombre} - Cantidad: **{producto.cantidad}** 
                    </p>
                    
                    <button 
                        onClick={() => sumarCantidad(producto.id_producto, producto.id_item_orden)}>
                        +
                    </button>
                    
                    <button 
                        onClick={() => restarCantidad(producto.id_producto, producto.id_item_orden)}>
                        -
                    </button>
                    
                    <button 
                        onClick={() => eliminarDelCarrito(producto.id_item_orden, producto.id_producto)}>
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    </div>
        </main>
    )
}
export default FuncionalidadCarrito