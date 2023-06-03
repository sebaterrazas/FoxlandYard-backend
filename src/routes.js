const Router = require('koa-router');

const characters = require('./routes/characters');
const users = require('./routes/users');
const games = require('./routes/games');
const nodes = require('./routes/nodes');

const router = new Router();

router.use('/characters', characters.routes());
router.use('/users', users.routes());
router.use('/games', games.routes());
router.use('/nodes', nodes.routes());

router.use();

module.exports = router;
