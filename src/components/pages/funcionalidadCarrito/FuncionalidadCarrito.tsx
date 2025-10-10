import { useEffect, useState } from "react";
import "./carrito.css"
import IconCart from "./icons/IconCart";
import IconDelete from "./icons/IconDelete";
import { Link } from "react-router-dom";
import AlertaCustom from "../funcionalidadCarrito/AlertaCustom";
import { useNavigate } from "react-router-dom";




const FuncionalidadCarrito = () => {


    type Producto = {
        id: number;
        nombre: string;
        imagen: string;
        precio: number;
        cantidad?: number;
    };

    const productosMock: Producto[] = [
        { id: 1, nombre: "Jade", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmYxMK1zbB5igrA2I5u7nSEC0jltT8JrlJng&s", precio: 5000 },
        { id: 2, nombre: "Ojo de gato", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmYxMK1zbB5igrA2I5u7nSEC0jltT8JrlJng&s", precio: 8500 },
        { id: 3, nombre: "Rubi", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmYxMK1zbB5igrA2I5u7nSEC0jltT8JrlJng&s", precio: 15000 },
    ];

    const navigate = useNavigate();
    const [carrito, setCarrito] = useState<Producto[]>([]);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [usuarioLogueado, setUsuarioLogueado] = useState<boolean>(false); // simulado, reemplazar con lógica real -  estaba en true y lo puse en false

    //AGREGADO: esto verifica automáticamente si el usuario está logueado al cargar el componente
    useEffect(() => {
        const usuario = localStorage.getItem("usuarioLogueado");
        if (usuario) {
            setUsuarioLogueado(true);
        } else {
            setUsuarioLogueado(false);
        }
    }, []);


    const handlerLogin = () => {
        setMostrarAlerta(false);
        navigate("/login");
        console.log("Navegando a login");
    }


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

    const calcularTotal = carrito.reduce((total, producto) => {
        return total + producto.precio * (producto.cantidad || 1);
    }, 0);



    // mantener el estado del logueo context para saber el estado
    const handleConfirmarCompra = () => {
        if (!usuarioLogueado) {
            setMostrarAlerta(true);
        } else {
            // redirigir al formulario de compra
            //window.location.href = "/formulario-compra";
            navigate("/formulario-compra");
        }
    };



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
                    <IconCart />
                </div>
            </div>

            <div className="carritoDisponible">
                {carrito.length === 0 ? (<h4 className="carritoVacio">El carrito está vacío</h4>) : mostrarCarrito() && (
                    carrito.map((producto) => (
                        <div key={producto.id} className="cardCarrito">
                            <img src={producto.imagen} alt={producto.nombre} />
                            <div className="product-text-info">
                                <h3 className="nombreProducto">{producto.nombre}</h3>
                                <div className="details-container">
                                    <p className="details">Precio: ${producto.precio}</p>
                                    <p className="details">Total: ${producto.precio * (producto.cantidad || 1)}</p>
                                </div>
                            </div>
                            <div className="botonesCarrito">
                                <button onClick={() => restarCantidad(producto.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="white" className="bi bi-dash" viewBox="0 0 16 16">
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                    </svg>
                                </button>
                                <span>{producto.cantidad}</span>
                                <button onClick={() => sumarCantidad(producto.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="white" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                </button>
                                <div className="botonEliminar">
                                    <button onClick={() => eliminarDelCarrito(producto.id)}><IconDelete /></button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {carrito.length > 0 && (  //si el carrito no tiene nada no muestra total
                <>
                    <h3>Su total es: ${calcularTotal}</h3>

                    {usuarioLogueado ? (
                        <Link to="/formulario-compra">
                            <button onClick={handleConfirmarCompra}>Confirmar compra</button>
                        </Link>
                    ) : (
                        <div>
                            <button
                                className="botonConfirmar"
                                onClick={() => setMostrarAlerta(true)}
                            >
                                Confirmar compra
                            </button>

                            {mostrarAlerta && (
                                <AlertaCustom
                                    mensaje="Para confirmar tu compra, necesitás iniciar sesión o registrarte."
                                    onLogin={handlerLogin}
                                    onRegistro={() => (setMostrarAlerta(false), navigate("/registro"))}
                                    onCerrar={() => setMostrarAlerta(false)}
                                />
                            )}
                        </div>
                    )}
                </>
            )}
        </main>
    )
}
export default FuncionalidadCarrito