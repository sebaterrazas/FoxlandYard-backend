const koa = require("koa");
const KoaLogger = require("koa-logger");
const { koaBody } = require("koa-body");
const router = require("./routes");
const cors = require('@koa/cors');
const orm = require("./models");

// Crea una instancia de Koa dentro de nuestra aplicacion.
const app = new koa();

app.context.orm = orm;


// Conexión a la base de datos.


// NO SÉ SI EN EL PROYECTO SALTE EL PROBLEMA DEL CORS, PERO SI LO HACE DESCOMENTAR LA LÍNEA.
// La siguiente línea arregla el problema de Cors.
// app.use(cors(({credentials: true})));

// Middlewares proporcionados por Koa.
app.use(koaBody());
app.use(KoaLogger()); // Este no es muy importante la verdad, es solo para mostrar unas cosas en la terminal de Ubuntu, pero lo dejo porque se ve bonito.


// Koa-router.
app.use(router.routes());


// Ahora si voy a 'localhost:3000' en el browser veré esta página.
// Eso sí, para que aparezca la página primero debo "encender" la página con 'node src/index.js' en Ubuntu.

module.exports = app;