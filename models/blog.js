const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isYear(value) {
          if (
            !(
              Number(value) >= 1991 && Number(value) <= new Date().getFullYear()
            )
          ) {
            throw new Error(
              "an incorrect value is attempted to be given for a year written"
            )
            return true
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blog",
  }
)

module.exports = Blog
