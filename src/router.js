const Router = require('koa-router');

const Cosa1 = require('./routes/ruta_1.js')

const router = new Router();

router.use("/cosa1", Cosa1.routes());

// export default router; // No funciona para CommonJS
module.exports = router; // Para CommonJS