const Router = require('koa-router');

const router = new Router();

const { createCharacter, moveCharacter } = require('../functions/characters');
const { createGame, checkWinner, nextTurn } = require('../functions/games');
const { createBoard } = require('../functions/nodes');



router.post('games.list', '/filter', async (ctx) => {
  try {
    console.log('ctx.params', ctx.params);
    const { filterByAvailable } = ctx.request.body;
    let games = [];
    if (filterByAvailable) {
      games = await ctx.orm.Game.findAll({
        include: ctx.orm.Character,
        where: {
          plays_left: null,
        },
      });
    } else {
      games = await ctx.orm.Game.findAll({
        include: ctx.orm.Character,
      });
    }
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
      include: [
        ctx.orm.Node, 
        {
          model: ctx.orm.Character,
          include: [ // A continuación, incluimos el modelo User en Character
            {
              model: ctx.orm.User,
              attributes: ['username'], // Esto seleccionará solo la columna 'username'
            }
          ]
        },
        ctx.orm.MrFoxMovement]
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
    const finalBody = {...ctx.body};
    if (ctx.status !== 201) return;
    ctx.request.body = {
      ...ctx.request.body,
      gameId: ctx.body.game.id,
    }
    await createCharacter(ctx);
    if (ctx.status !== 201) return;
    await createBoard(ctx);
    ctx.body = finalBody;
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

router.patch('games.start.game', '/:gameId/start-game', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findByPk(ctx.params.gameId, {
      include: ctx.orm.Character,
    });
    await game.update({ current_turn: 'Mr. Fox', plays_left: 24 });
    ctx.body = { message: `Game started!` };
    ctx.status = 201;
  } catch (error) {
    console.log('errrrorrr', error);
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;