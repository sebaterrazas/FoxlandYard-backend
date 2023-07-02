
async function createGame(ctx) {
  try {
    const game = await ctx.orm.Game.create({
      winner: null,
      plays_left: null,
      current_turn: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    ctx.body = { game };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
}

async function checkWinner(ctx) {
  const game = await ctx.orm.Game.findByPk(ctx.params.gameId, {
      include: ctx.orm.Character,
  });

  const MrFox = game.Characters.find(character => character.name === 'Mr. Fox');

  if (MrFox.food === 20) {
      await game.update({ winner: 'Mr. Fox' });
      ctx.body = { message: 'Mr. Fox wins!' }
      ctx.status = 204
      return
  }

  for (const character of game.Characters) {
    if (character.name === 'Mr. Fox') continue;

    if (character.nodeId === MrFox.nodeId) {
      await game.update({ winner: 'Farmers' });
      ctx.body = { message: 'Farmers win!' }
      ctx.status = 203
      return
    }
  }

  if (game.plays_left === 0) {
      await game.update({ winner: 'Tie' });
      ctx.body = { message: 'It\'s a tie...' }
      ctx.status = 202
      return
  }

  await game.update({ plays_left: game.plays_left });
  ctx.body = { message: 'Game continues...' }
  ctx.status = 201
}

async function nextTurn(ctx) {
  const order = ['Mr. Fox',  'Mr. Bean', 'Mr. Boggis', 'Mr. Bunce'];

  const game = await ctx.orm.Game.findByPk(ctx.params.gameId, {
    include: ctx.orm.Character,
  });

  let nextCharacter = null;
  let nextCharacterIndex = (order.indexOf(game.current_turn) + 1) % order.length ;
  do {
    const nextCharacterName = order[nextCharacterIndex];
    nextCharacter = game.Characters.find(character => character.name === nextCharacterName);
    nextCharacterIndex = (nextCharacterIndex + 1) % order.length;
  } while (!nextCharacter);

  await game.update({ current_turn: nextCharacter.name });
  ctx.body = { nextTurn: nextCharacter.userId, message: `${nextCharacter.name}'s turn.` };
  ctx.status = 201;
}

module.exports = {
  createGame,
  checkWinner,
  nextTurn
}