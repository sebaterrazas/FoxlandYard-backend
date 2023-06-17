const Router = require('koa-router');

const router = new Router();

router.get('games.list', '/', async (ctx) => {
  try {
    const games = await ctx.orm.Game.findAll();
    ctx.body = games;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('games.show', '/:gameId', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findByPk(ctx.params.gameId);
    ctx.body = game;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('games.create', '/', async (ctx) => {
  try {
    const game = await ctx.orm.Game.create({
      turn: null,
      winner: null,
      plays_left: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(game);
    ctx.body = game;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('games.show.board', '/:gameId/board', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findByPk(ctx.params.gameId, {
      include: ctx.orm.Node,
    });

    ctx.body = { game };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
});

router.get('games.characters', '/:gameId/characters', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findByPk(ctx.params.gameId, {
      include: ctx.orm.Character,
    });
    ctx.body = game ? game.Characters : [];
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.patch('games.next.turn', '/:gameId/next-turn', async (ctx) => {
  try {
    const order = ['Mr. Fox', 'Mr. Boggis', 'Mr. Bunce', 'Mr. Bean'];

    const game = await ctx.orm.Game.findByPk(ctx.params.gameId, {
      include: ctx.orm.Character,
    });

    let currentCharacterIndex = 0;
    if (game.turn) {
      const currentCharacter = await ctx.orm.Character.findByPk(game.turn);
      currentCharacterIndex = order.indexOf(currentCharacter.name);
    }
    let nextCharacterIndex = null;
    let nextCharacter = null;
    do {
      nextCharacterIndex = (currentCharacterIndex + 1) % 4;
      nextCharacter = game.Characters.findOne({
        where: { name: order[nextCharacterIndex] },
      });
    } while (!nextCharacter);

    await game.update({ turn: nextCharacter.userId });
    ctx.body = { nextTurn: nextCharacter.userId };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('games.create.board', '/:gameId/board', async (ctx) => {
  try {
    const gameId = parseInt(ctx.params.gameId, 10);
    const board = [];

    // Create all nodes

    // Nodes 1 to 15
    for (let i = 1; i <= 15; i += 1) {
      board.push(await ctx.orm.Node.create({
        nodeId: i,
        location: null,
        gameId,
        hasTrap: false,
        foodType: null,
        movementType: 'walk',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    }

    // Node 16
    board.push(await ctx.orm.Node.create({
      nodeId: 16,
      location: 'The Fox Hole',
      gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'bike',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Node 17
    board.push(await ctx.orm.Node.create({
      nodeId: 17,
      location: 'Underground hideout',
      gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'bike',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Node 18
    board.push(await ctx.orm.Node.create({
      nodeId: 18,
      location: 'School',
      gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'bike',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Node 19
    board.push(await ctx.orm.Node.create({
      nodeId: 19,
      location: 'Sewers',
      gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'bike',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Nodes 20, 21 and 22
    for (let i = 20; i <= 22; i += 1) {
      board.push(await ctx.orm.Node.create({
        nodeId: i,
        location: null,
        gameId,
        hasTrap: false,
        foodType: null,
        movementType: 'bike',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    }

    // Node 23
    board.push(await ctx.orm.Node.create({
      nodeId: 23,
      location: null,
      gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'car',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Node 24
    board.push(await ctx.orm.Node.create({
      nodeId: 24,
      location: 'Supermarket',
      gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'car',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Node 25
    board.push(await ctx.orm.Node.create({
      nodeId: 25,
      location: "Boggis' Farm",
      gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'car',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Node 26
    board.push(await ctx.orm.Node.create({
      nodeId: 26,
      location: "Bunce's Farm",
      gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'car',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Node 27
    board.push(await ctx.orm.Node.create({
      nodeId: 27,
      location: "Bean's Farm",
      gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'car',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const connections = await ctx.orm.Connection.findAll();

    ctx.body = { board, connections };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
});

router.patch('games.check.winner', '/:gameId/check-winner', async (ctx) => {
    try {
        const game = await ctx.orm.Game.findByPk(ctx.params.gameId, {
            include: [ctx.orm.Node, ctx.orm.Character]
        });

        const MrFox = game.Characters.findOne({
            where: { name: 'Mr. Fox'}
        });

        if (MrFox.food === 20) {
            await game.update({ winner: 'Mr. Fox' });
            ctx.body = { message: 'Mr. Fox wins!' }
            ctx.status = 201
            return
        }

        game.Characters.forEach(async (character) => {
            if (character.name === 'Mr. Fox') return;

            if (character.nodeId === MrFox.nodeId) {
                await game.update({ winner: 'Farmers' });
                ctx.body = { message: 'Farmers win!' }
                ctx.status = 202
                return
            }
        })

        if (game.plays_left === 0) {
            await game.update({ winner: 'tie' });
            ctx.body = { message: 'It\'s a tie...' }
            ctx.status = 203
            return
        }

        await game.update({ plays_left: plays_left - 1 });
        ctx.body = { message: 'Game continues...' }
        ctx.status = 204
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

router.patch('game.start', '/:gameId/start', async (ctx) => {
    try {
      const game = await ctx.orm.Game.findByPk(ctx.params.gameId, {
          include: ctx.orm.Character
      });

      // Verifies that the game hasn't started yet
      if (game.plays_left !== null) {
        ctx.body = { message: 'Game already started.' }
        ctx.status = 201
        return
      }

      // Verifies that the lenght of Characters is 4
      if (game.Characters.length !== 4) {
          ctx.body = { message: 'There must be 4 characters in the game' }
          ctx.status = 400
          return
      }

      game.update({ plays_left: 24 });
      ctx.body = { message: 'Game starts!' }
      ctx.status = 202
    } catch (error) {
      ctx.body = error
      ctx.status = 500
    }
});

module.exports = router;

// Create all nodes connections (56 hardcoded connections)
// const connections =
// [
//     await ctx.orm.Connection.create({
//         node1Id: 16,
//         node2Id: 1,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 16,
//         node2Id: 2,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 16,
//         node2Id: 3,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 16,
//         node2Id: 18,
//         movementType: 'bike',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 1,
//         node2Id: 17,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 2,
//         node2Id: 3,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 3,
//         node2Id: 23,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 1,
//         node2Id: 5,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 17,
//         node2Id: 5,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 2,
//         node2Id: 18,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 2,
//         node2Id: 4,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 23,
//         node2Id: 4,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 23,
//         node2Id: 7,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 7,
//         node2Id: 19,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 4,
//         node2Id: 19,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 17,
//         node2Id: 18,
//         movementType: 'bike',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 23,
//         node2Id: 24,
//         movementType: 'car',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 4,
//         node2Id: 18,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 24,
//         node2Id: 18,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 24,
//         node2Id: 18,
//         movementType: 'bike',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 6,
//         node2Id: 18,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 5,
//         node2Id: 6,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 5,
//         node2Id: 25,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 5,
//         node2Id: 20,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 20,
//         node2Id: 9,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 18,
//         node2Id: 20,
//         movementType: 'bike',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 6,
//         node2Id: 8,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 9,
//         node2Id: 13,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 13,
//         node2Id: 25,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 25,
//         node2Id: 24,
//         movementType: 'car',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 8,
//         node2Id: 9,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 8,
//         node2Id: 24,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 8,
//         node2Id: 21,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 20,
//         node2Id: 21,
//         movementType: 'bike',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 21,
//         node2Id: 13,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 19,
//         node2Id: 24,
//         movementType: 'bike',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 19,
//         node2Id: 10,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 10,
//         node2Id: 24,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 10,
//         node2Id: 21,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 24,
//         node2Id: 27,
//         movementType: 'car',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 19,
//         node2Id: 27,
//         movementType: 'bike',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 10,
//         node2Id: 11,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 25,
//         node2Id: 22,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 25,
//         node2Id: 22,
//         movementType: 'bike',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 25,
//         node2Id: 26,
//         movementType: 'car',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 22,
//         node2Id: 14,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 14,
//         node2Id: 26,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 13,
//         node2Id: 22,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 21,
//         node2Id: 12,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 21,
//         node2Id: 22,
//         movementType: 'bike',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 21,
//         node2Id: 26,
//         movementType: 'bike',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 12,
//         node2Id: 26,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 12,
//         node2Id: 11,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 11,
//         node2Id: 15,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 15,
//         node2Id: 26,
//         movementType: 'walk',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 27,
//         node2Id: 26,
//         movementType: 'car',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
//     await ctx.orm.Connection.create({
//         node1Id: 27,
//         node2Id: 21,
//         movementType: 'bike',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }),
// ]
