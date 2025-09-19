import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import "./Homepage.css";


const HomePage = () => {
  return (
    <div >
       <header className="hero">
       <img src="/img/header.jpg" className="hero__img" />
          <div className="hero__content">
           <h1>✨ Bienvenidos a Wisteria ✨</h1>
           <p>El lugar donde la magia cobra vida</p>
        </div>
       </header>

      <section className="favoritos">
         <h2>Favoritos ➜</h2>
         <div className="favoritos-grid">
           <div className="favorito-card">
           <div className="favorito-img">
            <img src="/img/Amatista.jpg" alt="Amatista" />
           </div>
           <h3>Amatista</h3>
           <p>$6.500</p>
           </div>

           <div className="favorito-card">
           <div className="favorito-img">
            <img src="/img/Vela Negra.jpg" alt="Vela Negra"/>
           </div>
            <h3>Vela Negra</h3>
            <p>$3.000</p>
           </div>

           <div className="favorito-card">
           <div className="favorito-img">
           <img src="/img/Collar.png" alt="Collar Místico"/>
           </div>
           <h3>Collar Místico</h3>
           <p>$6.000</p>
           </div>
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
       <img src="/img/Carrusel1.jpg" alt="Local Wisteria 1" className="img"/>
       </SwiperSlide>
       <SwiperSlide>
       <img src="/img/Carrusel2.jpg" alt="Local Wisteria 2" className="img"/>
       </SwiperSlide>
       <SwiperSlide>
       <img src="/img/Carrusel3.jpg" alt="Local Wisteria 3" className="img"/>
     </SwiperSlide>
    </Swiper>
   </section>
    {/* 🔮 NUESTRA HISTORIA */}
    <section className="about-wisteria">
    <h2>✨ Wisteria: Magia Real, Ahora También Online ✨</h2>

   <p>Somos Belén, Lucila y Morena, y hace tiempo dimos vida a <strong>Wisteria</strong>, 
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
  );
};

export default HomePage;
