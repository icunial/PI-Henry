const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      min_height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_height: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      min_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_weight: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      min_life_span: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_life_span: {
        type: DataTypes.INTEGER,
      },
      life_span: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false,
    }
  );
};
