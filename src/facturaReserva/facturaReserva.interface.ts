export interface FacturaBase {

    reserva:number,
    documento:string,
    nombre:string,
    fecha:Date,
    subtotal:number,
    impuestos:number,
    total:number

}

export interface Factura extends FacturaBase {
    id: number;
}