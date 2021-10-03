// src/facturaReserva/facturaReserva.interface.ts

import { Factura } from "./facturaReserva.interface";

export interface Facturas {
  [key: number]: Factura;
}