'use strict';

const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InternetIdentity extends Model {
    static associate(models) {
        InternetIdentity.belongsTo(models.user)
    }
  };
  
  InternetIdentity.init({
    identityId: DataTypes.STRING,
    identityType: DataTypes.STRING,
    screenName: DataTypes.STRING,
    data: DataTypes.JSONB,
    revokedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'internetIdentity',
    defaultScope: {
      where: {
        revokedAt: null
      }
    },
  });
  
  return InternetIdentity;
};