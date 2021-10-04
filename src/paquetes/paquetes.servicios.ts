// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { PaqueteBase, Paquete } from "./paquete.interface";
import { Paquetes } from "./paquetes.interface";

var Amadeus = require('amadeus');

var amadeus = new Amadeus({
  clientId: 'x7QHkkjuTnMJ0oWmYLgR41px7QhAY4lz',
  clientSecret: '4LCSHcAGCGTahP3X'
});


/**
 * In-Memory Store
 */

let paquetes: Paquetes = {
   1: {
     id: 1,
     nombre:'paquete 1',
     descripcion:'descripcion paquete 1'   
    },
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

export const amaprueba = async(): Promise<any> => {

    let a = 'a'

    await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: 'SYD',
      destinationLocationCode: 'BKK',
      departureDate: '2021-11-01',
      adults: '2'
  }).then(function(response:any){
    a = response.data;
  }).catch(function(responseError:any){
    console.log(responseError);
    a = responseError;
  });

  return a
}

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