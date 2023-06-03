const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
// const cors = require('@koa/cors');
const yamljs = require('yamljs');
const { koaSwagger } = require('koa2-swagger-ui');

const router = require('./routes');
const orm = require('./models');

// Carga el documento de la API.
const spec = yamljs.load('./api.yaml');

// Crea una instancia de Koa dentro de nuestra aplicacion.
const app = new Koa();

app.context.orm = orm;

// Conexión a la base de datos.

// NO SÉ SI EN EL PROYECTO SALTE EL PROBLEMA DEL CORS, PERO SI LO HACE DESCOMENTAR LA LÍNEA.
// La siguiente línea arregla el problema de Cors.
// app.use(cors(({credentials: true})));

// Middlewares proporcionados por Koa.
app.use(koaBody());
app.use(KoaLogger()); // Este no es muy importante la verdad, es solo para mostrar unas cosas en
// la terminal de Ubuntu, pero lo dejo porque se ve bonito.

// Koa-router.
app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: { spec },
  }),
);
app.use(router.routes());

module.exports = app;