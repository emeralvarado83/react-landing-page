import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer>
            <div className="footer-row-one">
                <div className="footer-logo">
                    <h2>StickersLab</h2>
                </div>
                <div className="footer-products">
                    <h3>Productos</h3>
                    <a href="#">Paquete Mascotas</a>
                    <a href="#">Paquete Frutas</a>
                    <a href="#">Paquete Cósmico</a>
                </div>
                <div className="footer-aboutus">
                    <h3>Enlaces</h3>
                    <a href="#">Política de Privacidad</a>
                    <a href="#">Política de Cookies</a>
                </div>
                <div className="footer-networks">
                    <h3>Síguenos</h3>
                    <div className="links">
                        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#"><FontAwesomeIcon icon={faTiktok} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-row-two">
                <p>Stickermania - Descubre los stickers que te representan.</p>
            </div>
        </footer>
    );
}
 
export default Footer;