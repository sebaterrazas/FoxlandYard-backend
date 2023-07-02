const Router = require('koa-router');
const { Op } = require('sequelize');

const router = new Router();

// Inútil (?)
router.get('nodes.connections', '/connections', async (ctx) => {
  try {
    const { nodeId, gameId } = ctx.request.body;

    // Busca el nodo por ID
    const node = await ctx.orm.Node.findOne({
      where: {
        nodeId,
        gameId,
      },
    });

    if (!node) {
      ctx.status = 404;
      ctx.body = { error: 'Nodo no encontrado' };
      return;
    }

    // Encuentra todas las conexiones donde el nodo aparece como node1Id o node2Id
    const connections = await ctx.orm.Connection.findAll({
      attributes: ['node1Id', 'node2Id', 'movementType', 'createdAt'],
      where: {
        [Op.or]: [
          { node1Id: nodeId },
          { node2Id: nodeId },
        ],
      },
    });

    // Devuelve las conexiones encontradas
    ctx.status = 200;
    ctx.body = { connections };
  } catch (error) {
    // Si hay un error, maneja la excepción y devuelve un mensaje de error
    ctx.status = 500;
    ctx.body = { error: 'Ocurrió un error al buscar las conexiones del nodo' };
  }
});

router.get('nodes.characters', '/characters', async (ctx) => {
  try {
    const { nodeId, gameId } = ctx.request.body;

    // Busca el nodo por sus IDs
    const node = await ctx.orm.Node.findOne({
      where: {
        nodeId,
        gameId,
      },
      include: ctx.orm.Character,
    });
    ctx.body = node ? node.Characters : [];
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.patch('nodes.food', '/food', async (ctx) => {
  try {
    const { nodeId, gameId, foodType } = ctx.request.body;

    // Busca el nodo por sus IDs
    const node = await ctx.orm.Node.findOne({
      where: {
        nodeId,
        gameId,
      },
      include: ctx.orm.Character,
    });

    const message = foodType ? `Food (${foodType}) has appear at node ${nodeId}` : '';

    await node.update({ foodType });
    ctx.body = { message };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
