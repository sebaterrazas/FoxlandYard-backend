const Router = require('koa-router');
const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt')

const characters = require('./routes/characters');
const users = require('./routes/users');
const games = require('./routes/games');
const nodes = require('./routes/nodes');
const authRoutes = require('./routes/auth.js')
// const scopeProtectedRoutes = require('./routes/scopeExample.js')

dotenv.config();

const router = new Router();

router.use(authRoutes.routes());


// Desde esta línea, todas las rutas requieriran un JWT. Esto no aplica para
// las líneas anteriores
router.use(jwtMiddleware( { secret: process.env.JWT_SECRET } ))

router.use('/characters', characters.routes());
router.use('/users', users.routes());
router.use('/games', games.routes());
router.use('/nodes', nodes.routes());

router.use();

module.exports = router;
