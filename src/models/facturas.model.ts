import mongoose from "mongoose"

const { Schema } = mongoose

// esquema de la coleccion de facturas de reservas de paquetes de viajes
const facturasSchema = new Schema({
    
    reserva: {type: String, required:true },
    documento: {type: String, required:true },
    nombre: {type: String, required:true },
    fecha: {type: Date, required:true },
    subtotal: {type: Number, required:true },
    impuestos: {type: Number, required:true },
    total: {type: Number, required:true }
})

// asignandole la coleccion de la base de datos
export const modeloFacturas = mongoose.model('facturas', facturasSchema)