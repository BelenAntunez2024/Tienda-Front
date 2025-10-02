import { useState } from "react";

const FuncionalidadCarrito = () => {
    /*      CRITERIOS DE APROBACIÓN
    Crear botón para agregar al carrito. +
    Crear botón individual para eliminar producto del carrito.
    Crear botón para eliminar la totalidad del carrito. +
    Crear botón (+) para añadir stock del mismo producto.
    Crear botón (-) para eliminar stock del mismo producto.
    Resumen de los productos elegidos
    ----------------------------------------------------------
    RESUMEN DE LOS PRODUCTOS ELEGIDOS:
    Nombre Imagen Cantidad Precio unitario Total
    */
    type Producto = {
        id: number;
        nombre: string;
        imagen: string;
        precio: number;
        cantidad?: number;
    };

    const productosMock: Producto[] = [
        { id: 1, nombre: "Camiseta", imagen: "https://via.placeholder.com/100", precio: 5000 },
        { id: 2, nombre: "Pantalón", imagen: "https://via.placeholder.com/100", precio: 8500 },
        { id: 3, nombre: "Zapatillas", imagen: "https://via.placeholder.com/100", precio: 15000 },
    ];


    const [carrito, setCarrito] = useState<Producto[]>([]);

    //funcion para agregar productos al carrito
    const agregarAlCarrito = (producto: Producto) => {

        if (carrito.find((item) => item.id === producto.id)) {
            const nuevoCarrito = carrito.map(item =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad! + 1 } : item
            );
            setCarrito(nuevoCarrito);
        } else {
            const nuevoProducto = { ...producto, cantidad: 1 }
            setCarrito([...carrito, nuevoProducto])
            console.log("Producto agregado:", producto.nombre);
        }
    };

    const eliminarDelCarrito = (productoId: number) => {
        if (carrito.find((item) => item.id === productoId)) {
            const nuevoCarrito = carrito.filter((item) => item.id !== productoId);
            setCarrito(nuevoCarrito);
            console.log("Producto eliminado del carrito, ID:", productoId);
        } else {
            console.log("El producto no está en el carrito");
        }
    }

    const restarCantidad = (productoId: number) => {
        const producto = carrito.find((item) => item.id === productoId); //valida si el prod existe(id)
        if (producto && producto.cantidad && producto.cantidad > 1) {
            //resta la cantidad del producto encontrado
            const carritoItemRestado = carrito.map(item => item.id === productoId ? //si es el producto buscado
                //le resta 1 a la cantidad             si no es el producto buscado, lo deja igual
                { ...item, cantidad: item.cantidad! - 1 } : item

            )
            setCarrito(carritoItemRestado);
        } if (producto && producto.cantidad === 1) { //si la cantidad es 0, elimina el producto del carrito
            eliminarDelCarrito(productoId);
        }
        else {
            return ("El producto no está en el carrito");
        }
    }

    const sumarCantidad = (productoId: number) => {
        const producto = carrito.find((item) => item.id === productoId); //valida si el prod existe(id)
        if (producto) {
            const carritoItemSumado = carrito.map(item => item.id === productoId ? { ...item, cantidad: item.cantidad! + 1 } //aumenta la cantidad del producto encontrado
                : item //si no es el producto buscado, lo deja igual
            )
            setCarrito(carritoItemSumado);
        }
        else {
            return ("El producto no está en el carrito");
        }
    }

    return (
        <main>
            <h1> Carrito </h1>

            <div>
                <h2>Productos elegidos</h2>
                <div>
                    {carrito.map((producto) => (
                        <div key={producto.id}>
                            <button onClick={() => sumarCantidad(producto.id)}>+</button>
                            <button onClick={() => restarCantidad(producto.id)}>-</button>
                            <button onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
                        </div>
                    ))}
                </div>
            </div>

            {productosMock.map((producto) => (
                <div key={producto.id}>
                    <button onClick={() => agregarAlCarrito(producto)}>Agregar</button>
                </div>


            ))}

        </main>
    )
}
export default FuncionalidadCarrito