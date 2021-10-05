# API-paquetes
api de paquetes de viajes

### paquete de viajes

- nombre
- descripcion

### reservas de paquetes de viajes

- paquete de viajes
- fecha de salida
- numero de adultos
- numero de niños
- cliente//
- nombre completo
- e mail
- numero telefonico
- ciudad de residencia

### factura de reserva

- reserva
- documento
- nombre
- fecha
- subtotal
- impuestos
- total

 ## instalar dependencias

`cd api-paquetes/`

  `npm i`

 ## crear un archivo .env en la carpeta principal
 
 `cd api-paquetes/`
 
 abrir el .env

 `escribir: PORT=7000`

 ## correr el proyecto de manera local

 `npm run dev`

## Ejemplos de uso del api

~~~

 Traer los paquetes de viajes disponibles

 localhost:7000/api/v1/paquetes/DB/

~~~

~~~

 Crear un paquete de viajes 

 localhost:7000/api/v1/paquetes/DB/

~~~

### adicional debemos pasarle un body en formato json con la info de un paquete:

`{
   "nombre": "paquete 5",
   "descripcion": "descripcion paquete 5"
}`

~~~

Eliminar un paquete de viajes

localhost:7000/api/v1/paquetes/DB/`{id del paquete de viajes}`

~~~

~~~

Actualizar un paquete de viajes

localhost:7000/api/v1/paquetes/DB/`{id del paquete de viajes}`

~~~

### adicional debemos pasarle un body en formato json con la info de un paquete:

`{
   "nombre": "paquete 5 actualizado",
   "descripcion": "descripcion paquete 5 actualizado"
}`


