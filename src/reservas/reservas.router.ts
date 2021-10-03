/**
 * Modulos e interfaces requeridos
 */

import express, { Request, Response } from "express";
import * as ReservasService from "./reservas.servicios";
import { ReservaBase, Reserva } from "./reserva.interface";

/**
 * Definiendo el router
 */

export const reservasRouter = express.Router();


/**
 * Definiciones de los controladores
 */

// GET reservas

reservasRouter.get("/", async (req: Request, res: Response) => {
    try {
      const items: Reserva[] = await ReservasService.findAll();
  
      res.status(200).send(items);
    } catch (e:any) {
      res.status(500).send(e.message);
    }
});

// GET reservas/:id

reservasRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Reserva = await ReservasService.find(id);

    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("Reserva no encontrada");
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// POST reservas

reservasRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: ReservaBase = req.body;

    const newItem = await ReservasService.create(item);

    res.status(201).json(newItem);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// PUT reservas/:id

reservasRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Reserva = req.body;

    const existingItem: Reserva = await ReservasService.find(id);

    if (existingItem) {
      const updatedItem = await ReservasService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await ReservasService.create(itemUpdate);

    res.status(201).json(newItem);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// DELETE reservas/:id

reservasRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ReservasService.remove(id);

    res.sendStatus(204);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});