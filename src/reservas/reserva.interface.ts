export interface ReservaBase {

    paquete_viajes: string;
    fecha_salida: Date;
    numero_adultos: number;
    numero_niños: number;
    cliente: string;
    nombre_completo: string;
    e_mail: string;
    numero_telefonico: string;
    ciudad_residencia: string;

}

export interface Reserva extends ReservaBase {
    id: number;
}