const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('actividad', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
        type: DataTypes.NUMERIC,
        allowNull: true,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    season:{
        type: DataTypes.STRING,
        allowNull: true,
    },
  });
};