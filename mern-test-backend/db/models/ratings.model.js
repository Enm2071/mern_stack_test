const {Model, DataTypes, Sequelize} = require('sequelize');


const RATING_TABLE = 'ratings';

const RatingSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  rate: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 1)
  },
  count: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
};

class RatingModel extends Model {

  static associate(models) {
    this.hasOne(models.Product, { as: 'product', foreignKey: 'ratingId'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RATING_TABLE,
      modelName: 'Rating',
      timestamps: false,
    }
  }
}


module.exports = {
  RatingModel,
  RatingSchema,
  RATING_TABLE
}
