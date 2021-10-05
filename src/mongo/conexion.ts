
import mongoose from 'mongoose'
const uri: any = process.env.URIDB;

export const conexion = mongoose.connect(uri)
