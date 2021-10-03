export interface PaqueteBase {

    nombre: string;
    descripcion: string;

}

export interface Paquete extends PaqueteBase {
    id: number;
}