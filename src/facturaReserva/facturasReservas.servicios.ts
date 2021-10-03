// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { FacturaBase, Factura } from "./facturaReserva.interface";
import { Facturas } from "./facturasReservas.interface";


/**
 * Simulando la base de datos
 */

let facturas: Facturas = {
  1: {
    id:1,
    reserva:1,
    documento:'1001618278',
    nombre:'Jheyson Velez Marín',
    fecha: new Date(),
    subtotal:1_000_000,
    impuestos:190_000,
    total:1_190_000
    },
  2: {
    id:2,
    reserva:2,
    documento:'1001',
    nombre:'Maria Fernanda Henao Herrera',
    fecha: new Date(),
    subtotal:2_000_000,
    impuestos:380_000,
    total:2_380_000
  },
  3: {
    id:3,
    reserva:3,
    documento:'1002',
    nombre:'Mateo Montoya Aristizabal',
    fecha: new Date(),
    subtotal:2_000_000,
    impuestos:380_000,
    total:2_380_000
  }
};


/**
 * Metodos de los servicios
 */

export const findAll = async (): Promise<Factura[]> => Object.values(facturas);

export const find = async (id: number): Promise<Factura> => facturas[id];


export const create = async (newItem: FacturaBase): Promise<Factura> => {
    const id = new Date().valueOf();

    facturas[id] = {
        id,
        ...newItem,
    };

    return facturas[id];
};

export const update = async (
    id: number,
    itemUpdate: FacturaBase
): Promise<Factura | null> => {
    const item = await find(id);

    if (!item) {
        return null;
    }
  
    facturas[id] = { id, ...itemUpdate };
  
    return facturas[id];
};

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);
  
    if (!item) {
      return null;
    }
  
    delete facturas[id];
};