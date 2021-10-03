/**
 * Modulos e interfaces requeridos
 */

import express, { Request, Response } from "express";
import * as FacturasService from "./facturasReservas.servicios";
import { FacturaBase, Factura } from "./facturaReserva.interface";

/**
 * Definiendo el router
 */

export const facturasRouter = express.Router();


/**
 * Definiciones de los controladores
 */

// GET factura factura

facturasRouter.get("/", async (req: Request, res: Response) => {
    try {
      const items: Factura[] = await FacturasService.findAll();
  
      res.status(200).send(items);
    } catch (e:any) {
      res.status(500).send(e.message);
    }
});

// GET facturas/:id

facturasRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Factura = await FacturasService.find(id);

    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("Factura no encontrada");
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// POST facturas

facturasRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: FacturaBase = req.body;

    const newItem = await FacturasService.create(item);

    res.status(201).json(newItem);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// PUT facturas/:id

facturasRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Factura = req.body;

    const existingItem: Factura = await FacturasService.find(id);

    if (existingItem) {
      const updatedItem = await FacturasService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await FacturasService.create(itemUpdate);

    res.status(201).json(newItem);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// DELETE facturas/:id

facturasRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await FacturasService.remove(id);

    res.sendStatus(204);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});