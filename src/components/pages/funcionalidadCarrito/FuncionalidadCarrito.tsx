import { useState, useEffect } from "react";
import type { CarritoItem } from "./interfaces/CarritoItem";
import VolverAtras from "../../layout/VolverAtras";
import './FuncionalidadCarrito.css'
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const FuncionalidadCarrito = () => {

    const [cantidadActualizada, setCantidadActualizada] = useState(false);
    const [carrito, setCarrito] = useState<CarritoItem[]>([]);
    const token = localStorage.getItem('token') || '';
    const decoded: any = jwtDecode(token);
    const userId = decoded.id || decoded.Id_usuario || decoded.sub;

    //carga los items del carrito desde el backend
    useEffect(() => {
        const fetchCarrito = async () => {
            try {

                const response = await fetch(`http://localhost:3000/item-ordenes/carrito/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                console.log('Datos recibidos:', data);
                const mappedCarrito = data.map((item: any) => ({
                    ...item.producto,  // Copia todos los campos del producto
                    cantidad: item.cantidad_productos,  // Renombra el campo
                    id_item_orden: item.id_item_orden
                }));
                console.log('Datos mapeados:', mappedCarrito);
                setCarrito(mappedCarrito);
            } catch (err) {
                console.error('Error al obtener el carrito:', err);
            }
        };
        fetchCarrito();
    }, []);

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
        
        /*const response = await fetch(`http://localhost:3000/item-ordenes/eliminar-item/${idItemOrden}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Usamos el token para autenticar
            }
        }); */



        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudo actualizar la cantidad.`);
        }
    };

    const eliminar = async (idItemOrden: number) => {
        const token = localStorage.getItem('token') || '';

        const response = await fetch(`http://localhost:3000/item-ordenes/orden/${idItemOrden}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Usamos el token para autenticar
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudo eliminar el producto.`);
        }
    };
    //llama al DELETE y elimina el producto del estado del carrito
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
                setCantidadActualizada(true);
                setTimeout(() => setCantidadActualizada(false), 3000);
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
            setCantidadActualizada(true);
            setTimeout(() => setCantidadActualizada(false), 3000);
        } catch (error) {
            console.error("Error al sumar cantidad:", error);
        }
    }


    return (
        <main>
            <VolverAtras hasNavbar={true} />
            <h1 className="carrito-titulo"> Carrito </h1>

            <div className='carrito-container'>
                <h2 className="carrito-subtitulo">Productos elegidos</h2>
                <div className="container-card">
                    {carrito.length === 0 ? (
                        <p className='carrito-vacio'>Carrito vacío</p>
                    ) : (
                        carrito.map((producto) => (
                            <div key={producto.id_item_orden} className="card-carrito">
                                <h2 className="nombre-producto">{producto.nombre}</h2>
                                <img src={producto.imagen} alt={producto.nombre} width={200} />
                                <div className="product-text-info">
                                    <p className="p-precio">
                                        Precio: ${(producto.precio * producto.cantidad).toFixed(2)}
                                    </p>
                                    <p>Cantidad: {producto.cantidad}</p>
                                </div>
                                <div className="btn-container">
                                    <button className="btn-sumar"
                                        onClick={() => sumarCantidad(producto.id_producto, producto.id_item_orden)}>
                                        +
                                    </button>
                                    <button className="btn-restar"
                                        onClick={() => restarCantidad(producto.id_producto, producto.id_item_orden)}>
                                        -
                                    </button>
                                    <button className="btn-eliminar"
                                        onClick={() => eliminarDelCarrito(producto.id_item_orden, producto.id_producto)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        )))}
                </div>
            </div>
            {cantidadActualizada && (
                <div className="alerta-exito">
                    <p>¡Cantidad actualizada con éxito!</p>
                </div>
            )}

            <Link to={`/confirmarCompra`} className="link-no-decoration">
                <button className="btn-confirmar-compra">
                    Confirmar compra
                </button>
            </Link>


        </main>
    )
}
export default FuncionalidadCarrito