'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Connection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Node, { as: 'Node1', foreignKey: 'node1Id' });
      this.belongsTo(models.Node, { as: 'Node2', foreignKey: 'node2Id' });
    }
  }
  Connection.init({
    node1Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "Nodes", key: "nodeId" },
    },
    node2Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "Nodes", key: "nodeId" },
    },
    movementType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Connection',
  });
  return Connection;
};