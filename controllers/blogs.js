const router = require("express").Router()

const { Blog } = require("../models")

router.get("/", async (req, res) => {
  const blogs = await await Blog.findAll()
  res.json(blogs)
})

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.delete("/:id", async (req, res) => {
  if ((await Blog.destroy({ where: { id: req.params.id } })) !== 0) {
    return res.status(204).json()
  }
  return res.status(400).json()
})

module.exports = router
