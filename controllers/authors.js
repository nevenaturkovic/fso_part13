const router = require("express").Router()
const { fn, col } = require("sequelize")

const { User, Blog } = require("../models")

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    group: "blog.author",
    // include: {
    //   model: User,
    //   attributes: ["name"],
    // },
    attributes: [
      [col("blog.author"), "author"],
      [fn("COUNT", col("blog.id")), "articles"],
      [fn("SUM", col("blog.likes")), "likes"],
    ],
    order: [["likes", "DESC"]],
  })
  res.json(blogs)
})

module.exports = router
