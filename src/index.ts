/**
 * Modulos requeridos
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { paquetesRouter } from "./paquetes/paquetes.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

/**
 * variables de app
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  Configuracion de app
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/v1/paquetes", paquetesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Activacion del servidor
 */

app.listen(PORT, () => {
console.log(`Escuchando api en el puerto ${PORT}`);
});