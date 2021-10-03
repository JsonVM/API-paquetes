// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { PaqueteBase, Paquete } from "./paquete.interface";
import { Paquetes } from "./paquetes.interface";


/**
 * In-Memory Store
 */

let paquetes: Paquetes = {
   1: {
     id: 1,
     nombre:'paquete 1',
     descripcion:'descripcion paquete 1'   },
   2: {
      id: 2,
     nombre:'paquete 2',
     descripcion:'descripcion paquete 2'
   },
   3: {
     id: 3,
     nombre:'paquete 3',
    descripcion:'descripcion paquete 3'
  }
};


/**
 * Service Methods
 */

export const findAll = async (): Promise<Paquete[]> => Object.values(paquetes);

export const find = async (id: number): Promise<Paquete> => paquetes[id];


export const create = async (newItem: PaqueteBase): Promise<Paquete> => {
    const id = new Date().valueOf();

    paquetes[id] = {
        id,
        ...newItem,
    };

    return paquetes[id];
};

export const update = async (
    id: number,
    itemUpdate: PaqueteBase
): Promise<Paquete | null> => {
    const item = await find(id);

    if (!item) {
        return null;
    }
  
    paquetes[id] = { id, ...itemUpdate };
  
    return paquetes[id];
};

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);
  
    if (!item) {
      return null;
    }
  
    delete paquetes[id];
  };