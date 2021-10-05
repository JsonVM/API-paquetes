import mongoose from "mongoose"

const { Schema } = mongoose

// esquema de la coleccion de reservas de paquetes de viajes
const reservasSchema = new Schema({
    
    paquete_viajes: {type: String, required:true },
    fecha_salida: {type: Date, required:true },
    numero_adultos: {type: Number, required:true },
    numero_niños: {type: Number, required:true },
    cliente: {type: String, required:true },
    nombre_completo: {type: String, required:true },
    e_mail: {type: String, required:true },
    numero_telefonico: {type: String, required:true },
    ciudad_residencia: {type: String, required:true }
})

// asignandole la coleccion de la base de datos
export const modeloReservas = mongoose.model('reservas', reservasSchema)