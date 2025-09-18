import "./Homepage.css";
const HomePage = () => {
  return (
    <div>
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
  </div>
  );
}

export default HomePage;
