import koa from "koa";
import KoaLogger from "koa-logger";
import { koaBody } from "koa-body";
// import router from ""; // Para importar las rutas.
import cors from '@koa/cors';

// Crea una instancia de Koa dentro de nuestra aplicacion.
const app = new koa();

// NO SÉ SI EN EL PROYECTO SALTE EL PROBLEMA DEL CORS, PERO SI LO HACE DESCOMENTAR LA LÍNEA.
// La siguiente línea arregla el problema de Cors.
// app.use(cors(({credentials: true})));

// Middlewares proporcionados por Koa.
app.use(koaBody());
app.use(KoaLogger()); // Este no es muy importante la verdad, es solo para mostrar unas cosas en la terminal de Ubuntu, pero lo dejo porque se ve bonito.


// Koa-router.
// app.use(router.routes());

// Hacer que el servidor escuche en el puerto 3000.
app.listen(3000, () => {
    console.log("=== Iniciando app ===\nEscuchando en el puerto 3000...")
});

// Ahora si voy a 'localhost:3000' en el browser veré esta página.
// Eso sí, para que aparezca la página primero debo "encender" la página con 'node src/index.js' en Ubuntu.