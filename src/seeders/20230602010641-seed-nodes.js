const nodes = [];

for (let gameId = 1; gameId <= 3; gameId += 1) {
  // Create all nodes
  // Nodes 1 to 15
  for (let i = 1; i <= 15; i += 1) {
    nodes.push(
      {
        nodeId: i,
        location: null,
        gameId: gameId,
        hasTrap: false,
        foodType: null,
        movementType: 'walk',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );
  }

  // Node 16
  nodes.push(
    {
      nodeId: 16,
      location: 'The Fox Hole',
      gameId: gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'bike',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  );

  // Node 17
  nodes.push(
    {
      nodeId: 17,
      location: 'Underground hideout',
      gameId: gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'bike',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  );

  // Node 18
  nodes.push(
    {
      nodeId: 18,
      location: 'School',
      gameId: gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'bike',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  );

  // Node 19
  nodes.push(
    {
      nodeId: 19,
      location: 'Sewers',
      gameId: gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'bike',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  );

  // Nodes 20, 21 and 22
  for (let i = 20; i <= 22; i += 1) {
    nodes.push(
      {
        nodeId: i,
        location: null,
        gameId: gameId,
        hasTrap: false,
        foodType: null,
        movementType: 'bike',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );
  }

  // Node 23
  nodes.push(
    {
      nodeId: 23,
      location: null,
      gameId: gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'car',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  );

  // Node 24
  nodes.push(
    {
      nodeId: 24,
      location: 'Supermarket',
      gameId: gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'car',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  );

  // Node 25
  nodes.push(
    {
      nodeId: 25,
      location: "Boggis' Farm",
      gameId: gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'car',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  );

  // Node 26
  nodes.push(
    {
      nodeId: 26,
      location: "Bunce's Farm",
      gameId: gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'car',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  );

  // Node 27
  nodes.push(
    {
      nodeId: 27,
      location: "Bean's Farm",
      gameId: gameId,
      hasTrap: false,
      foodType: null,
      movementType: 'car',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  );
}

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Nodes', nodes),
  down: (queryInterface) => queryInterface.bulkDelete('Nodes', null, {}),
};
