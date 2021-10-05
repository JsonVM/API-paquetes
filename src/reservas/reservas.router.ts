/**
 * Modulos e interfaces requeridos
 */

import express, { Request, Response } from "express";
import * as ReservasService from "./reservas.servicios";
import { ReservaBase, Reserva } from "./reserva.interface";
import { modeloReservas } from "../models/reservas.model";
import {conexion}  from "../mongo/conexion";

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
/*
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
*/
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



/**
 * 
 * A partir de aqui las peticiones son trabajadas desde una base de datos en mongoDB
 * 
 */

/**
 * Get a las reservas que se encuentran en la base de datos 
 */
 reservasRouter.get("/DB/", async (req: Request, res: Response) => {
  try {
    await conexion;

    const reservas: Reserva[] | any = await modeloReservas.find();

    res.status(200).send(reservas);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * Get a una sola reserva por ID en la base de datos
 */
reservasRouter.get("/DB/:id", async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const reserva = await modeloReservas.findById(id);

    if (reserva) {
      return res.status(200).send(reserva);
    }

    res.status(404).send("Reserva no encontrada");
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

/**
 * Post a las reservas que se encuentran en la base de datos
 */
 reservasRouter.post("/DB/", async (req: Request, res: Response) => {
  try {
    await conexion;
    const reserva: ReservaBase = req.body;

    const reserva_creada = await modeloReservas.insertMany(reserva)

    res.status(201).json(reserva_creada);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

/**
 * Delete a una reserva en la base de datos
 */
reservasRouter.delete("/DB/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const reserva = await modeloReservas.findById(id);
    if (reserva) {
      await reserva?.remove();
      return res.status(204).send("reserva eliminada correctamente");
    }
    res.sendStatus(204);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

/**
 * Put a una reserva en la base de datos
 */

 reservasRouter.put("/DB/:id", async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const reserva_actualizar = req.body;

    const reserva_existente = await modeloReservas.findById(id);

    if (reserva_existente) {
      reserva_existente.overwrite(reserva_actualizar);
      await reserva_existente.save();
      return res.status(201).json(reserva_actualizar);
    }

    res.status(200).json('no se pudo actualizar');

  } catch (e:any) {
    res.status(500).send(e);
  }
});