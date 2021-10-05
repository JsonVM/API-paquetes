# API-paquetes
api de paquetes de viajes

## uri pricipal 

      https://paquetes-comfama.herokuapp.com/

## repositorio 
      
      https://github.com/JsonVM/API-paquetes/

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


# Ejemplos de uso del api

## Paquetes de viajes ( db )

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

## Reservas de paquetes de viajes

~~~

 Traer todas las reservas de viajes

 localhost:7000/api/v1/reservas/DB/

~~~

~~~

 Crear una reserva de paquete de viajes 

 localhost:7000/api/v1/reservas/DB/

~~~

### adicional debemos pasarle un body en formato json con la info de una reserva de un paquete:

`{
   "paquete_viajes": "paquete 1",
        "fecha_salida": "2021-10-05T01:42:03.003Z",
        "numero_adultos": 2,
        "numero_niños": 1,
        "cliente": "1",
        "nombre_completo": "Jheyson vélez Marín",
        "e_mail": "jheyson.v.m1@gmail.com",
        "numero_telefonico": "3195097744",
        "ciudad_residencia": "Itagui"
    }`

~~~

Eliminar una reserva de paquete de viajes

localhost:7000/api/v1/reservas/DB/`{id de la reserva del paquete de viajes}`

~~~

~~~

Actualizar una reserva de paquete de viajes

localhost:7000/api/v1/reservas/DB/`{id de la reserva de paquete de viajes}`

~~~

### adicional debemos pasarle un body en formato json con la info de una reserva de un paquete:

`{
        "_id": "615badf431b1d5cfae048e8f",
        "paquete_viajes": "paquete 3",
        "fecha_salida": "2021-11-05T01:42:03.003Z",
        "numero_adultos": 2,
        "numero_niños": 2,
        "cliente": "1",
        "nombre_completo": "Mateo Montoya aristizabal.",
        "e_mail": "mateomon2882@gmail.com",
        "numero_telefonico": "3195097744",
        "ciudad_residencia": "Envigadoo"
}`

## Facturas de reservas

~~~

 Traer todas las facturas de reservas

 localhost:7000/api/v1/facturasReservas/DB/

~~~

~~~

 Crear una factura de reservas

 localhost:7000/api/v1/reservas/DB/

~~~

### adicional debemos pasarle un body en formato json con la info de una factura de una reserva:

`{
        "reserva": "615badca31b1d5cfae048e8d",
        "documento": "1001618278",
        "nombre": "Jheyson Velez Marín",
        "fecha": "2021-10-05T02:51:57.631Z",
        "subtotal": 1000000,
        "impuestos": 190000,
        "total": 1190000
    }`

~~~

Eliminar una factura de una reserva

localhost:7000/api/v1/facturasReservas/DB/`{id de la factura de reserva}`

~~~

~~~

Actualizar una factura de reserva

localhost:7000/api/v1/facturasReservas/DB/`{id de la reserva de paquete de viajes}`

~~~

### adicional debemos pasarle un body en formato json con la info de una factura de una reserva:

`{
        "reserva": "615bade931b1d5cfae048e8e",
        "documento": "10011",
        "nombre": "Maria Fernanda Henao Herrera",
        "fecha": "2021-10-05T02:51:57.631Z",
        "subtotal": 2000000,
        "impuestos": 380000,
        "total": 2380000
    }`


## Notificar via correo con la factura

      Ejemplo de envio de correo con la informacion de una factura, de momento manda la info en forma de json

      localhost:7000/api/v1/facturasReservas/enviar-factura/mariafernandahenaoherrera@gmail.com/615bbe4eda803be2b5be43db