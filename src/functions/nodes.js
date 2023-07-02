
async function createBoard(ctx) {
    const gameId = parseInt(ctx.request.body.gameId, 10);
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
}

module.exports = {
    createBoard,
};


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
