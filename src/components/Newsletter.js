import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHand } from '@fortawesome/free-regular-svg-icons';
import {db} from '../firebase/firebaseConfig';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';

const Newsletter = () => {

    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(email)){
            alert('Por favor ingresa un correo valido');
            return;
        }

        if(email === ''){
            alert('Debes ingresar un correo');
            return;
        }

        try {
            // Consultamos en la base de datos si ya existe el correo, esto es para evitar duplicados
            const consulta = query(
                collection(db, 'suscriptores'),
                where('email', '==', email)
            );

            const snapshot = await getDocs(consulta);
    
            if (!snapshot.empty) {
                setMensaje("Este correo ya está suscrito.");
                return;
             }

            // Almacenar el correo en Firestore
            await addDoc(collection(db, 'suscriptores'), {
                email: email
            })

            // Lógica para enviar el correo
            const response = await fetch('http://localhost:5000/send-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });
      
            const data = await response.json();
            console.log('Respuesta del servidor', data);

            if (response.ok) {
              setMensaje(data.message);
              setEmail('');
            } else {
              setMensaje(data.error);
            }
          } catch (error) {
            console.error("Error al enviar el correo o guardar el suscriptor:", error);
            setMensaje('Error al enviar el correo.');
          }
    }

    return (
        <section className="newsletter">
            <div className="newsletter-title">
                <h3>Obten mas actualizaciones</h3>
            </div>
            <div className="subscription-nospam">
                <div className="subscription">
                    <p>Quieres ser notificado cuando se sumen nuevos paquetes de stickers? Suscribete a nuestro boletin y seras el primero en conocer los ultimos podructos agregados.</p>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Suscribete</button>
                    </form>
                </div>
                <div className="nospam">
                    <div>
                        <FontAwesomeIcon icon={faCalendar}/>
                        <h4>Articulos Mensuales</h4>
                        <p>Recibiras mensualmente articulos, promociones e informacion de nuevos productos que estaran disponibles en al tienda.</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faHand}/>
                        <h4>No Spam</h4>
                        <p>No tienes que preocuparte, solo sera informacion de interes para que te mantengas actualizado.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Newsletter;