/**
 * Modulos e interfaces requeridos
 */

import express, { Request, Response } from "express";
import * as FacturasService from "./facturasReservas.servicios";
import * as ReservasService from "../reservas/reservas.servicios";
import { FacturaBase, Factura } from "./facturaReserva.interface";
import nodemailer from "nodemailer";
import { Reserva } from "../reservas/reserva.interface";
import { modeloFacturas } from "../models/facturas.model";
import {conexion}  from "../mongo/conexion";

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

/*
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
});*/

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

// POST de notificacion de factura por correo

facturasRouter.post("/enviar-factura/:correo/:factura", async (req: Request, res: Response) => {

  const id: number = parseInt(req.params.factura, 10);

  try {
    const item: Factura = await FacturasService.find(id);
    const reserva: Reserva = await ReservasService.find(item.reserva);

    if (item) {
      
      const correo =  req.params.correo;
      const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port:465,
                secure:true,
                auth: {
                    user: 'jheysonvelez@gmail.com',
                    pass: 'qmcssjhqcjnylcka',
                },
            });
        
            var mailOptions = {
                from: '"Servicio de paquetes de viajes Comfama" <jheysonvelez@gmail.com>',
                to: correo,
                subject:"Factura de reserva de paquete de viajes",
                html: `
                <b>¡Aquí está tu factura!</b>
                <p> documento: ${item.documento} </p>
                <p> nombre: ${item.nombre} </p>
                <p> fecha: ${item.fecha} </p>
                <p> reserva: ${reserva.fecha_salida} nombre: ${reserva.nombre_completo} paquete: ${reserva.paquete_viajes} </p>
                <p> subtotal: ${item.subtotal} </p>
                <p> impuestos: ${item.impuestos} </p>
                <p> total: ${item.total} </p>

                <table class="default">

                <tr>

                  <td>nombre: ${item.nombre}</td>
                  <td>documento: ${item.documento}</td>

                </tr>

                <tr>

                  <td>Celda 4</td>

                  <td>Celda 5</td>

                  <td>Celda 6</td>

                </tr>

              </table>
                `
            }


            transporter.sendMail(mailOptions, (error, info)=> {
                if(error){
                    res.status(500).send(error.message)
                } else {
                    res.status(200).send({correo, mensaje:"Correo enviado exitosamente, revisa tu correo, a veces puede aparecer en la seccion de spam",info});
                }
            }) 

    } else {
      res.status(404).send("Factura no encontrada");
    }
  } catch (e:any) {
    res.status(500).send(e.message);
  }
 
})

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

/**
 * 
 * A partir de aqui las peticiones son trabajadas desde una base de datos en mongoDB
 * 
 */

/**
 * Get a las facturas que se encuentran en la base de datos 
 */
 facturasRouter.get("/DB/", async (req: Request, res: Response) => {
  try {
    await conexion;

    const facturas: Reserva[] | any = await modeloFacturas.find();

    res.status(200).send(facturas);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * Get a una sola factura por ID en la base de datos
 */
facturasRouter.get("/DB/:id", async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const factura = await modeloFacturas.findById(id);

    if (factura) {
      return res.status(200).send(factura);
    }

    res.status(404).send("factura no encontrada");
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

/**
 * Post a las facturas que se encuentran en la base de datos
 */
 facturasRouter.post("/DB/", async (req: Request, res: Response) => {
  try {
    await conexion;
    const factura: FacturaBase = req.body;

    const factura_creada = await modeloFacturas.insertMany(factura)

    res.status(201).json(factura_creada);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

/**
 * Delete a una factura en la base de datos
 */
 facturasRouter.delete("/DB/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const factura = await modeloFacturas.findById(id);
    if (factura) {
      await factura?.remove();
      return res.status(204).send("factura eliminada correctamente");
    }
    res.sendStatus(204);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

/**
 * Put a una factura en la base de datos
 */

 facturasRouter.put("/DB/:id", async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const factura_actualizar = req.body;

    const factura_existente = await modeloFacturas.findById(id);

    if (factura_existente) {
      factura_existente.overwrite(factura_actualizar);
      await factura_existente.save();
      return res.status(201).json(factura_actualizar);
    }

    res.status(200).json('no se pudo actualizar la factura');

  } catch (e:any) {
    res.status(500).send(e);
  }
});