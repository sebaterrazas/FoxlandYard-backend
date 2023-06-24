'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MrFoxMovement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, { foreignKey: 'gameId' });
    }
  }
  MrFoxMovement.init({
    gameId: DataTypes.INTEGER,
    movementType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MrFoxMovement',
  });
  return MrFoxMovement;
};