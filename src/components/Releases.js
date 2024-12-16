import React, {useState, useEffect} from 'react';
import {db} from '../firebase/firebaseConfig';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import formatearCantidad from '../functions/formatearCantidad';

const Releases = () => {
    const [stickers, setStickers] = useState([]);

    useEffect(() => {
        // Define la consulta para traer los últimos 15 stickers
        const q = query(
            collection(db, 'stickers'),
            orderBy('timestamp', 'desc'), // Ordena por el campo de tiempo de creación
            limit(15)                     // Límite de 15 documentos
        );

        const unsubscribe = onSnapshot(
            q, (snapshot) => {
                const stickersArray = snapshot.docs.map((document) => {
                    return {...document.data(), id: document.id}
                });

                setStickers(stickersArray);
            },
            (error) => {
                console.log(error);
            }
        );

        // Limpieza del listener al desmontar el componente
        return () => unsubscribe();
    }, []);

    const handleSlider = (direction) => {
        const slider = document.querySelector('.releases-cards');
        const scrollAmount = slider.offsetWidth;

        slider.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    }

    return (
        <section className="releases">
            <div className="releases-title-controls">
                <h3>Lo mas nuevo</h3>
                <div className="releases-controls">
                    <button role="button" className="left-arrow" onClick={() => handleSlider('left')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M5 12l14 0"></path> <path d="M5 12l6 6"></path> <path d="M5 12l6 -6"></path> </svg>
                    </button>
                    <button role="button" className="right-arrow" onClick={() => handleSlider('right')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M5 12l14 0"></path> <path d="M13 18l6 -6"></path> <path d="M13 6l6 6"></path> </svg>
                    </button>
                </div>
            </div>
            <div className="releases-cards">
                <div className="releases-slider">
                    {
                        stickers.map((sticker) => {
                            return(
                                <div className="releases-slider-card" key={sticker.id}>
                                    <a href='#'>
                                        <img src={sticker.image} alt={sticker.name}/>
                                    </a>
                                    <span>{sticker.name}</span>
                                    <span>{formatearCantidad(sticker.price)}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
}
 
export default Releases;