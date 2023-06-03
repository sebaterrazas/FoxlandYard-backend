const Router = require('koa-router');

const router = new Router();

const cosa_1 = {
    "atributo": "Hola, soy un atributo... creo"
}


router.get("/", async (ctx) => {
    ctx.body = cosa_1;
})


// export default router; // No funciona para CommonJS
module.exports = router; // Para CommonJS