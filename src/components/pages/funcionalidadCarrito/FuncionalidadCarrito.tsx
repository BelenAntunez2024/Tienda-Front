import { useState } from "react";
import "./carrito.css"
import IconCart from "./IconCart";

const FuncionalidadCarrito = () => {
    /*      CRITERIOS DE APROBACIÓN
    Crear botón para agregar al carrito. +
    Crear botón individual para eliminar producto del carrito. +
    Crear botón para eliminar la totalidad del carrito. +
    Crear botón (+) para añadir stock del mismo producto. +
    Crear botón (-) para eliminar stock del mismo producto. +
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
    { id: 1, nombre: "Jade", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmYxMK1zbB5igrA2I5u7nSEC0jltT8JrlJng&s", precio: 5000 },
    { id: 2, nombre: "piedra", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmYxMK1zbB5igrA2I5u7nSEC0jltT8JrlJng&s", precio: 8500 },
    { id: 3, nombre: "piedra", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmYxMK1zbB5igrA2I5u7nSEC0jltT8JrlJng&s", precio: 15000 },
    ];

    
    const [carrito, setCarrito] = useState<Producto[]>([]);

    //funcion para agregar productos al carrito
    const agregarAlCarrito = (producto: Producto) => {

        if(carrito.find((item) => item.id === producto.id)) {
            const nuevoCarrito = carrito.map(item =>
            item.id === producto.id ? { ...item, cantidad: item.cantidad! + 1 }: item
            );
            setCarrito(nuevoCarrito);
        }else{
           const nuevoProducto = { ...producto, cantidad: 1 }
            setCarrito([...carrito, nuevoProducto])
            console.log("Producto agregado:", producto.nombre);
        }
    };

    const eliminarDelCarrito = (productoId: number) => {
        if(carrito.find((item) => item.id === productoId)) {
            const nuevoCarrito = carrito.filter((item) => item.id !== productoId);
            setCarrito(nuevoCarrito);
            console.log("Producto eliminado del carrito, ID:", productoId);
        }else{
            console.log("El producto no está en el carrito");
        }
    }

    const restarCantidad = (productoId: number) =>{
        const producto = carrito.find((item) => item.id === productoId); //valida si el prod existe(id)
        if (producto && producto.cantidad && producto.cantidad > 1) { 
            //resta la cantidad del producto encontrado
            const carritoItemRestado = carrito.map(item => item.id === productoId? //si es el producto buscado
                //le resta 1 a la cantidad             si no es el producto buscado, lo deja igual
                {...item, cantidad: item.cantidad! - 1} : item 

        )
        setCarrito(carritoItemRestado);
        } if(producto && producto.cantidad === 1) { //si la cantidad es 0, elimina el producto del carrito
            eliminarDelCarrito(productoId);
        }
        else {
            return("El producto no está en el carrito");
        }
    }

    const sumarCantidad = (productoId: number) => {
        const producto = carrito.find((item) => item.id === productoId); //valida si el prod existe(id)
        if (producto) { 
            const carritoItemSumado = carrito.map(item => item.id === productoId? { ...item, cantidad: item.cantidad! + 1 } //aumenta la cantidad del producto encontrado
            : item //si no es el producto buscado, lo deja igual
        )
        setCarrito(carritoItemSumado);
        }
        else {
            return("El producto no está en el carrito");
        }
    }

    const mostrarCarrito = () => {
        return carrito.map((producto) => (
            <div key={producto.id}>
                <h3>{producto.nombre}</h3>
                <img src={producto.imagen} alt={producto.nombre} width={100} />
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio unitario: ${producto.precio}</p>
                <p>Total: ${producto.precio * (producto.cantidad || 1)}</p>
            </div>
        ));
    }
    
    return (
        <main>

            <div className="productosDisponibles">
            {productosMock.map((producto) => (
                <div key={producto.id} className="cardProducto">
                    <img src={producto.imagen} alt={producto.nombre} width={50} />
                    <span>{producto.nombre} - ${producto.precio}</span>
                    <button onClick={() => agregarAlCarrito(producto)}>Agregar</button>
                </div>
            ))}
            </div>
                <h1> Mi carrito </h1>

            <div className="tituloCarrito">
                <h2>Productos elegidos</h2>
                <div className="cart">
                    <IconCart/>
                </div>
            </div>

            <div className="carritoDisponible">
                {carrito.length === 0 ? ( <p>El carrito está vacío</p> ) : mostrarCarrito() && ( 
                    carrito.map((producto) => (
                    <div key={producto.id} className="cardCarrito">
                    <img src={producto.imagen} alt={producto.nombre} />
                    <h3 className="nombreProducto">{producto.nombre}</h3>
                    <p className="details">Precio unitario: ${producto.precio}</p> 
                    <p className="details">Total: ${producto.precio * (producto.cantidad || 1)}</p>

                   <div className="botonesCarrito">
                        <button onClick={() => restarCantidad(producto.id)}>-</button>
                        <span>{producto.cantidad}</span>
                        <button onClick={() => sumarCantidad(producto.id)}>+</button>
                        <div className="botonEliminar">
                            <button onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
                        </div>
                    </div>
                </div>
                    ))
                )}
            </div>

        </main>
    )
}
export default FuncionalidadCarrito