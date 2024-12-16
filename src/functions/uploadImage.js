// Importamos storage para conectarnos al backend
import { storage } from "../firebase/firebaseConfig";
import { v4 as uuidv4 } from 'uuid';

// importamos las funciones:
// ref para crear la referencia del archivo a subir
//uploadBytes para cargar el archivo
//getDownLoadURL para obtener la url del archivo guardado en storage 

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// creamos una funcion para cargar el archivo
const uploadFile = async (file) => {
    const storageRef = ref(storage, `stickerslab/${uuidv4()}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}

export default uploadFile;