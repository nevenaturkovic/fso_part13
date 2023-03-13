const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn("users", "active", "disabled")
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn("users", "disabled", "active")
  },
}
