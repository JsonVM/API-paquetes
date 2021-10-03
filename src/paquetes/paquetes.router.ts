/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as PaquetesService from "./paquetes.servicios";
import { PaqueteBase, Paquete } from "./paquete.interface";

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

// GET paquetes/:id

paquetesRouter.get("/:id", async (req: Request, res: Response) => {
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