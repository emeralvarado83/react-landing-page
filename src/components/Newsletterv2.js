import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHand } from '@fortawesome/free-regular-svg-icons';

const Newsletterv2 = () => {

    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if(!expresionRegular.test(email)){
            setMensaje('Por favor ingresa un correo válido.');
            return;
        }

        try {
            // Llamar a la API de Brevo para agregar el correo a la lista
            const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': process.env.REACT_APP_BREVO_API_KEY, 
                },
                body: JSON.stringify({
                    email: email,
                    listIds: [6], // Sustituye con el ID de tu lista en Brevo
                }),
            });

            if (brevoResponse.ok) {
                setMensaje('¡Gracias por suscribirte! Se agregó a la lista.');
            } else {
                const errorData = await brevoResponse.json();
                console.error('Error al agregar a Brevo:', errorData);
                setMensaje('Hubo un error al suscribirte en Brevo. Intenta de nuevo.');
            }

            setEmail(''); // Limpiar el campo de correo

          } catch (error) {
            console.error("Error al suscribirte:", error);
            setMensaje("Hubo un error al procesar tu suscripción. Intenta de nuevo.");
          }

          ocultarMensaje();
    }

    // Función para ocultar el mensaje después de 5 segundos
    const ocultarMensaje = () => {
        setTimeout(() => {
            setMensaje('');
        }, 5000);
    };

    return (
        <section className="newsletter">
            <div className="newsletter-title">
                <h3>Obtén mas actualizaciones</h3>
            </div>
            <div className="subscription-nospam">
                <div className="subscription">
                    <p>Quieres ser notificado cuando se sumen nuevos paquetes de stickers? Suscríbete a nuestro boletín y serás el primero en conocer los ultimos productos agregados.</p>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Suscríbete</button>
                    </form>
                    {mensaje && <p className="mensaje">{mensaje}</p>}
                </div>
                <div className="nospam">
                    <div>
                        <FontAwesomeIcon icon={faCalendar}/>
                        <h4>Artículos Mensuales</h4>
                        <p>Recibirás mensualmente artículos, promociones e información de nuevos productos que estarán disponibles en la tienda.</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faHand}/>
                        <h4>No Spam</h4>
                        <p>No tienes que preocuparte, solo será información de interés para que te mantengas actualizado.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Newsletterv2;