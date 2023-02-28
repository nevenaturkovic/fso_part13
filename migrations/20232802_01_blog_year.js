const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
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
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year")
  },
}
