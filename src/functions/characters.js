const { Op } = require('sequelize');

async function createCharacter(ctx) {
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

    const character = await ctx.orm.Character.create(characterParams);

    ctx.body = { character };
    ctx.status = 201;
};

async function moveCharacter(ctx) {
    const { characterId, movementType, destinationNodeId, useHelp } = ctx.request.body;

    const character = await ctx.orm.Character.findByPk(characterId, {
        include: ctx.orm.Node,
    });

    const helpAvailable = useHelp ? character.isAsh || character.isKris || character.isKyle : false;

    if (character.Node.hasTrap && character.name === 'Mr. Fox' && !helpAvailable) {
        ctx.status = 401;
        ctx.body = { message: `Mr. Fox can't move because he's trap at node ${character.Node.nodeId}.` };
        return;
    }

    const originNodeId = character.Node.nodeId;

    if (originNodeId === destinationNodeId) {
        ctx.status = 402;
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
        ctx.status = 403;
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

    if (character.name === 'Mr. Fox') {
        await ctx.orm.MrFoxMovement.create({ gameId: character.gameId, movementType});
    }

    ctx.body = { message: `${character.name} moved from node ${originNodeId} to node ${destinationNodeId} using ${movementType}.` };
    ctx.status = 201;
 };

 module.exports = {
    createCharacter,
    moveCharacter,
  }