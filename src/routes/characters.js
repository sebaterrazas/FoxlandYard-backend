const Router = require('koa-router');
const { Op } = require('sequelize');

const router = new Router();

router.get('characters.list', '/', async (ctx) => {
  try {
    const characters = await ctx.orm.Character.findAll();
    ctx.body = characters;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('characters.show', '/:characterId', async (ctx) => {
  try {
    const character = await ctx.orm.Character.findByPk(ctx.params.characterId);
    ctx.body = character;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.patch('characters.use.use-help', '/:characterId/use-help', async (ctx) => {
  try {
    const helpers = ['Ash', 'Kris', 'Kyle', 'Rat'];
    const { helperName } = ctx.request.body;

    const character = await ctx.orm.Character.findByPk(ctx.params.characterId);

    if (!helpers.includes(helperName)) {
      ctx.status = 400;
      ctx.body = { message: `${helperName} is not a valid helper.` };
      return;
    }

    const updateData = {};

    const helperBool = `is${helperName}`;
    updateData[helperBool] = false;

    await character.update(updateData);
    ctx.body = { message: `${character.name} used ${helperName}.` };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.patch('characters.grab.food', '/:characterId/grab-food', async (ctx) => {
  try {
    const { useHelp } = ctx.request.body;

    const character = await ctx.orm.Character.findByPk(ctx.params.characterId);

    const foodStolen = useHelp ? 5 : 1;

    await character.update({ food: character.food + foodStolen });
    ctx.body = { message: `Mr. Fox has stolen ${foodStolen} items.` };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.patch('characters.place.trap', '/:characterId/place-trap', async (ctx) => {
  try {
    const { useRat } = ctx.request.body;
    const character = await ctx.orm.Character.findByPk(ctx.params.characterId, {
      include: ctx.orm.Node,
    });
    const node = character.Node;

    if (character.food === 0 && !useRat) {
      ctx.status = 400;
      ctx.body = { message: 'Not enough food to place a trap!' };
      return;
    }

    if (node.hasTrap) {
      ctx.status = 400;
      ctx.body = { message: 'There\'s already a trap here.' };
      return;
    }

    if (useRat && !character.isRat) {
      ctx.status = 400;
      ctx.body = { message: 'Rat is not available.' };
      return;
    }

    await character.update({ food: character.food - 2 });
    await node.update({ hasTrap: true });

    ctx.body = { message: `${character.name} placed a trap at node ${node.nodeId}.` };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('characters.details', '/:characterId/details', async (ctx) => {
  try {
    const character = await ctx.orm.Character.findByPk(ctx.params.characterId, {
      include: [ctx.orm.Game, ctx.orm.User, ctx.orm.Node],
    });
    ctx.body = character;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.patch('games.move.character', '/:characterId/move-character', async (ctx) => {
  try {
    const { movementType, destinationNodeId, useHelp } = ctx.request.body;

    const character = await ctx.orm.Character.findByPk(ctx.params.characterId, {
      include: ctx.orm.Node,
    });

    const helpAvailable = useHelp ? character.isAsh || character.isKris || character.isKyle : false;

    if (character.Node.hasTrap && character.name === 'Mr. Fox' && !helpAvailable) {
      ctx.status = 400;
      ctx.body = { message: `Mr. Fox can't move because he's a trap at node ${character.Node.nodeId}.` };
      return;
    }

    const originNodeId = character.Node.nodeId;

    if (originNodeId === destinationNodeId) {
      ctx.status = 400;
      ctx.body = { message: `${character.name} is already at node ${originNodeId}.` };
      return;
    }

    let connections = null;

    if (movementType === 'burrow') {
      connections = await ctx.orm.Connection.findOne({
        where: {
          [Op.or]: [
            { node1Id: originNodeId, node2Id: destinationNodeId },
            { node1Id: destinationNodeId, node2Id: originNodeId },
          ],
        },
      });
    } else {
      connections = await ctx.orm.Connection.findOne({
        where: {
          [Op.or]: [
            { node1Id: originNodeId, node2Id: destinationNodeId, movementType },
            { node1Id: destinationNodeId, node2Id: originNodeId, movementType },
          ],
        },
      });
    }

    if (!connections) {
      ctx.status = 404;
      ctx.body = { message: `You can't get from node ${originNodeId} to node ${destinationNodeId} using ${movementType}.` };
      return;
    }

    const cardsLeft = character.get(`${movementType}Cards`);

    if (cardsLeft === 0) {
      ctx.status = 404;
      ctx.body = { message: `${character.name} doesn't have any more ${movementType} cards to use!`, isTrap: character.Node.hasTrap && character.name === 'Mr. Fox' };
      return;
    }

    const updateData = {
      nodeId: destinationNodeId,
    };

    const cardType = `${movementType}Cards`;
    updateData[cardType] = cardsLeft - 1;

    await character.update(updateData);
    ctx.body = { message: `${character.name} moved from node ${originNodeId} to node ${destinationNodeId} using ${movementType}.` };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('characters.create', '/', async (ctx) => {
  try {
    const {
      gameId,
      userId,
      nodeId,
      characterName,
    } = ctx.request.body;

    const characterParams = {
      gameId,
      userId,
      nodeId,
      traps: 0,
      food: characterName === 'Mr. Fox' ? 0 : 20,
      walkCards: 11,
      bikeCards: 8,
      carCards: 4,
      burrowCards: characterName === 'Mr. Fox' ? 1 : 0,
      isAsh: characterName === 'Mr. Fox',
      isKris: characterName === 'Mr. Fox',
      isKyle: characterName === 'Mr. Fox',
      isRat: characterName !== 'Mr. Fox',
      name: characterName,
    };

    const character = await ctx.orm.User.create(characterParams);
    ctx.body = { character };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
