const board1 = [];

// Create all nodes

// Nodes 1 to 15
for (let i = 1; i <= 15; i++) {
  board1.push(
    {
      nodeId: i,
      location: null,
      gameId: 1,
      hasTrap: false,
      foodType: null,
      movementType: 'walk',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );
}

// Node 16
board1.push(
  {
    nodeId: 16,
    location: 'The Fox Hole',
    gameId: 1,
    hasTrap: false,
    foodType: null,
    movementType: 'bike',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
);

// Node 17
board1.push(
  {
    nodeId: 17,
    location: 'Underground hideout',
    gameId: 1,
    hasTrap: false,
    foodType: null,
    movementType: 'bike',
    createdAt: new Date(),
    updatedAt: new Date(),
    }
);

// Node 18
board1.push(
  {
    nodeId: 18,
    location: 'School',
    gameId: 1,
    hasTrap: false,
    foodType: null,
    movementType: 'bike',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
);

// Node 19
board1.push(
  {
    nodeId: 19,
    location: 'Sewers',
    gameId: 1,
    hasTrap: false,
    foodType: null,
    movementType: 'bike',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
);

// Nodes 20, 21 and 22
for (let i = 20; i <= 22; i++) {
  board1.push(
    {
      nodeId: i,
      location: null,
      gameId: 1,
      hasTrap: false,
      foodType: null,
      movementType: 'bike',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );
}

// Node 23
board1.push(
  {
    nodeId: 23,
    location: null,
    gameId: 1,
    hasTrap: false,
    foodType: null,
    movementType: 'car',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
);

// Node 24
board1.push(
  {
    nodeId: 24,
    location: "Supermarket",
    gameId: 1,
    hasTrap: false,
    foodType: null,
    movementType: 'car',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
);

// Node 25
board1.push(
  {
    nodeId: 25,
    location: "Boggis' Farm",
    gameId: 1,
    hasTrap: false,
    foodType: null,
    movementType: 'car',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
);

// Node 26
board1.push(
  {
    nodeId: 26,
    location: "Bunce's Farm",
    gameId: 1,
    hasTrap: false,
    foodType: null,
    movementType: 'car',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
);

// Node 27
board1.push(
  {
    nodeId: 27,
    location: "Bean's Farm",
    gameId: 1,
    hasTrap: false,
    foodType: null,
    movementType: 'car',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
);

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Nodes', board1),
  down: (queryInterface) => queryInterface.bulkDelete('Nodes', null, {}),
};