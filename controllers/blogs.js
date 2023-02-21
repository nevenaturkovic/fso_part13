const router = require("express").Router()

const { Blog } = require("../models")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body)
  return res.json(blog)
})

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    throw Error("not found")
  }
})

router.delete("/:id", async (req, res) => {
  if ((await Blog.destroy({ where: { id: req.params.id } })) !== 0) {
    return res.status(204).json()
  }
  throw Error("can't delete non existing")
})

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    throw Error("not found")
  }
})

module.exports = router
