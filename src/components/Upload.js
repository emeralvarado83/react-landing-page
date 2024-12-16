import React, {useState} from 'react';
import {db} from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import uploadFile from '../functions/uploadImage';

const Upload = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');  // Limpiar mensaje previo

        try{
            const result = await uploadFile(image);

            await addDoc(collection(db, 'stickers'), {
                name: name,
                price: price,
                image: result,
                timestamp: serverTimestamp()
            })
            setStatus('¡Archivo subido exitosamente!');
        } catch(error) {
            console.log(error);
            setStatus('¡Error al subir el archivo!');
        }

        // Limpiar el formulario
        setName('');
        setPrice('');
        setImage(null);
    }

    return (
        <section className='upload'>
            <div className='upload-title'>
                <h3>Cargar archivos</h3>
            </div>
            <div className='upload-form'>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        placeholder='Ingresar nombre'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        type='text'
                        placeholder='Ingresar precio'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input 
                        type='file'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button>Subir</button>
                </form>
            </div>
        </section>
    );
}
 
export default Upload;