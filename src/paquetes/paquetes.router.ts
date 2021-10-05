/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as PaquetesService from "./paquetes.servicios";
import { PaqueteBase, Paquete } from "./paquete.interface";
import { modeloPaquetes } from "../models/paquetes.model";
import {conexion}  from "../mongo/conexion";

/**
 * Router Definition
 */

export const paquetesRouter = express.Router();


/**
 * Definiciones de los controladores
 */

// GET paquetes

paquetesRouter.get("/", async (req: Request, res: Response) => {
    try {
      const items: Paquete[] = await PaquetesService.findAll();
  
      res.status(200).send(items);
    } catch (e) {
      res.status(500).send(e);
    }
});

paquetesRouter.get("/amadeus", async (req: Request, res: Response) => {

  try {

    const paquetes_amadeus = await PaquetesService.amaprueba();
    console.log(paquetes_amadeus);
    

    if (paquetes_amadeus) {
      return res.status(200).send(paquetes_amadeus);
    } else {
      res.status(404).send("Paquete no encontrado");
    }

    
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// GET paquetes/:id

paquetesRouter.get("/DB/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Paquete = await PaquetesService.find(id);

    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("Paquete no encontrado");
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// POST paquetes

paquetesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: PaqueteBase = req.body;

    const newItem = await PaquetesService.create(item);

    res.status(201).json(newItem);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// PUT paquetes/:id

paquetesRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Paquete = req.body;

    const existingItem: Paquete = await PaquetesService.find(id);

    if (existingItem) {
      const updatedItem = await PaquetesService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await PaquetesService.create(itemUpdate);

    res.status(201).json(newItem);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// DELETE paquetes/:id

paquetesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await PaquetesService.remove(id);

    res.sendStatus(204);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});


/**
 * 
 * A partir de aqui las peticiones son trabajadas desde una base de datos en mongoDB
 * 
 */

/**
 * Get a los paquetes que se encuentran en la base de datos 
 */
 paquetesRouter.get("/DB/", async (req: Request, res: Response) => {
  try {
    await conexion;

    const paquetes: Paquete[] | any = await modeloPaquetes.find();

    res.status(200).send(paquetes);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * Post a los paquetes que se encuentran en la base de datos
 */
 paquetesRouter.post("/DB/", async (req: Request, res: Response) => {
  try {
    await conexion;
    const paquete: PaqueteBase = req.body;

    const paquete_creado = await modeloPaquetes.insertMany(paquete)

    res.status(201).json(paquete_creado);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

/**
 * Delete a un paquete en la base de datos
 */
paquetesRouter.delete("/DB/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const paquete = await modeloPaquetes.findById(id);
    if (paquete) {
      await paquete?.remove();
      res.sendStatus(204).send("paquete eliminado correctamente");
    }
    res.sendStatus(204);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

/**
 * Put a un paquete en la base de datos
 */

 paquetesRouter.put("/DB/:id", async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const paquete_actualizar = req.body;

    const paquete_existente = await modeloPaquetes.findById(id);

    if (paquete_existente) {
      paquete_existente.overwrite(paquete_actualizar);
      await paquete_existente.save();
      return res.status(201).json(paquete_actualizar);
    }

    res.status(200).json('no se pudo actualizar');

  } catch (e:any) {
    res.status(500).send(e);
  }
});