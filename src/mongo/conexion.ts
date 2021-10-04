
import mongoose from 'mongoose'
const uri = "mongodb+srv://adminPaquetes:TWU1lHYuzmBzGFM2@paquetes-comfama.4muai.mongodb.net/paquetesComfama?retryWrites=true&w=majority";

export const conexion = mongoose.connect(uri)
