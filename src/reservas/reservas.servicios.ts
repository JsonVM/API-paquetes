// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { ReservaBase, Reserva } from "./reserva.interface";
import { Reservas } from "./reservas.interface";


/**
 * Simulando la base de datos
 */

let reservas: Reservas = {
  1: {
    id:1,
    paquete_viajes: 'paquete 1',
    fecha_salida: new Date(),
    numero_adultos: 2,
    numero_niños: 1,
    cliente: '1',
    nombre_completo: 'Jheyson vélez Marín',
    e_mail: 'jheyson.v.m1@gmail.com',
    numero_telefonico: '3195097744',
    ciudad_residencia: 'Itagui'
    },
  2: {
    id:2,
    paquete_viajes: 'paquete 2',
    fecha_salida: new Date(),
    numero_adultos: 2,
    numero_niños: 2,
    cliente: '2',
    nombre_completo: 'Maria Fernanda Henao',
    e_mail: 'mariafernandahenaoherrera@gmail.com',
    numero_telefonico: '3195097744',
    ciudad_residencia: 'Envigado'
  },
  3: {
    id:3,
    paquete_viajes: 'paquete 3',
    fecha_salida: new Date(),
    numero_adultos: 2,
    numero_niños: 2,
    cliente: '3',
    nombre_completo: 'Mateo Montoya aristizabal',
    e_mail: 'mateomon2882@gmail.com',
    numero_telefonico: '3195097744',
    ciudad_residencia: 'Envigado'
  }
};


/**
 * Metodos de los servicios
 */

export const findAll = async (): Promise<Reserva[]> => Object.values(reservas);

export const find = async (id: number): Promise<Reserva> => reservas[id];


export const create = async (newItem: ReservaBase): Promise<Reserva> => {
    const id = new Date().valueOf();

    reservas[id] = {
        id,
        ...newItem,
    };

    return reservas[id];
};

export const update = async (
    id: number,
    itemUpdate: ReservaBase
): Promise<Reserva | null> => {
    const item = await find(id);

    if (!item) {
        return null;
    }
  
    reservas[id] = { id, ...itemUpdate };
  
    return reservas[id];
};

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);
  
    if (!item) {
      return null;
    }
  
    delete reservas[id];
};