// src/reservas/reservas.interface.ts

import { Reserva } from "./reserva.interface";

export interface Reservas {
  [key: number]: Reserva;
}