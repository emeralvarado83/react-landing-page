import React from 'react';
import heroImage from '../images/stickers-hero.png';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-promotion">
                <h2>Haz de cada espacio un lugar único con nuestros stickers</h2>
                <p>¡Hola! Aprovecha nuestra <span>promo 2x1</span>, compra tu primer paquete de stickers y llévate un segundo paquete totalmente gratis. Llena tus espacios de estilo y personalidad. No te pierdas esta oferta para descubrir el sticker que te representa.</p>
                <div className="hero-promotion-link">
                    <a href="#">Comprar tu primer paquete</a>
                </div>
            </div>
            <div className="hero-image">
                <img src={heroImage} alt="Coleccion de stickers"/>
            </div>
        </section>
    );
}
 
export default Hero;