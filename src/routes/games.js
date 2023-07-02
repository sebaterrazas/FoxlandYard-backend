const Router = require('koa-router');

const router = new Router();

const { createCharacter, moveCharacter } = require('../functions/characters');
const { createGame, checkWinner, nextTurn } = require('../functions/games');
const { createBoard } = require('../functions/nodes');



router.get('games.list', '/', async (ctx) => {
  try {
    const games = await ctx.orm.Game.findAll({
      include: ctx.orm.Character,
    });
    ctx.body = games;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('games.show', '/:gameId', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findByPk(ctx.params.gameId, {
      include: [ctx.orm.Node, ctx.orm.Character, ctx.orm.MrFoxMovement]
    });
    const connections = await ctx.orm.Connection.findAll();
    ctx.body = { game, connections };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('games.create', '/', async (ctx) => {
  try {
    await createGame(ctx);
    if (ctx.status !== 201) return;
    ctx.request.body = {
      ...ctx.request.body,
      gameId: ctx.body.game.id,
    }
    await createCharacter(ctx);
    if (ctx.status !== 201) return;
    await createBoard(ctx);
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.patch('games.perform.turn', '/:gameId/perform-turn', async (ctx) => {
  try {
    await moveCharacter(ctx);
    if (ctx.status !== 201) return;
    await checkWinner(ctx);
    // if (ctx.status !== 201) return;
    await nextTurn(ctx);
  } catch (error) {
    console.log('errrrorrr', error);
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;