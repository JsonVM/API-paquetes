import mongoose from "mongoose"

const { Schema } = mongoose

// esquema de la coleccion de paquetes de viajes
const paquetesSchema = new Schema({
    
    nombre: {type: String, required:true },
    descripcion: {type: String, required:true },
})

// asignandole la coleccion de la base de datos
export const modeloPaquetes = mongoose.model('paquetes', paquetesSchema)