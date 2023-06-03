'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Node extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, {foreignKey: 'gameId'});
      this.hasMany(models.Character, {foreignKey: 'nodeId', otherKey: 'gameId'});
      this.hasMany(models.Connection, { as: 'ConnectionsAsNode1', foreignKey: 'node1Id' });
      this.hasMany(models.Connection, { as: 'ConnectionsAsNode2', foreignKey: 'node2Id' });
    }
  }
  Node.init({
    nodeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    gameId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "Games", key: "id" },
    },
    hasTrap: DataTypes.BOOLEAN,
    foodType: DataTypes.STRING,
    movementType: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Node',
  });
  return Node;
};