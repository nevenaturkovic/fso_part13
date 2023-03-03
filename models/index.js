const Blog = require("./blog")
const User = require("./user")
const ReadingList = require("./readingList")

User.hasMany(Blog)
Blog.belongsTo(User)

// Blog.sync({ alter: true })
// User.sync({ alter: true })

User.belongsToMany(Blog, { as: "readings", through: ReadingList })
Blog.belongsToMany(User, { as: "readers", through: ReadingList })

module.exports = {
  Blog,
  User,
  ReadingList,
}
