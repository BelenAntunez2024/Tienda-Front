import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import "./Homepage.css";
import { BsStars } from "react-icons/bs";
import type { Product } from "../verProductos/interfaces/Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
  const [favoritos, setFavoritos] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        const response = await fetch('https://wisteriaback.onrender.com/producto', {
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
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setFavoritos(shuffled.slice(0, 3));
        console.log('Productos consultados:', data);
      } catch (err) {
        console.error('Error al consultar productos:', err);
      }
    };
    fetchAllProducts();
  }, []);


  return (
    <div className='main-container-homepage'>
      <div style={{ width: "100%" }}>
        <header className="hero">
          <img src="/img/header.png" className="hero__img" />
          <div className="hero__content">
            <h1><BsStars style={{ color: "#FFD700", filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 1))" }} /> Bienvenidos a Wisteria <BsStars style={{ color: "#FFD700", filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 1))" }} /></h1>
            <p>El lugar donde la magia cobra vida</p>
          </div>
        </header>

        <section className="favoritos">
          <h2>Favoritos ➜</h2>
          <div className="favoritos-grid">
            {favoritos.map((product) => (
              <Link
                to={`/producto/${product.id_producto}`}
                key={product.id_producto}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="favorito-card">
                  <div className="favorito-img">
                    <img src={product.imagen} alt={product.nombre} />
                  </div>
                  <h3>{product.nombre}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="titulo">
          <h2>Descubrí nuestro local</h2>
        </div>
        <section className="carousel">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={40}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 7000 }}
            loop={true}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="/img/Carrusel1.jpg" alt="Local Wisteria 1" className="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/Carrusel2.jpg" alt="Local Wisteria 2" className="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/Carrusel3.jpg" alt="Local Wisteria 3" className="img" />
            </SwiperSlide>
          </Swiper>
        </section>
        {/* NUESTRA HISTORIA */}
        <section className="about-wisteria">
          <h2>✨ Wisteria: Magia Real, Ahora También Online ✨</h2>

          <p>Somos Belén, Lucila y Bauti, y hace tiempo dimos vida a <strong>Wisteria</strong>,
            nuestro lugar físico donde la magia se respira en cada rincón. Entre estantes repletos
            de objetos únicos y un salón escondido donde creamos pociones y mezclas irrepetibles,
            hemos construido un espacio diferente: <strong>auténtico, místico y lleno de energía</strong>.</p>

          <p>Hoy nos animamos a dar un paso más: abrir las puertas de Wisteria al mundo digital.
            Porque lo que antes solo podías encontrar en nuestro local —productos auténticos, piezas
            que nadie más consigue y creaciones mágicas hechas a mano— ahora también podés descubrirlo
            desde nuestra página web.</p>
          <p><em>Bienvenid@ a un universo donde la magia es real, y está más cerca de lo que imaginás. ✨</em></p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
