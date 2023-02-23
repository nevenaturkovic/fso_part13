const router = require("express").Router()

const { Blog, User } = require("../models")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
  })
  res.json(blogs)
})

router.post("/", async (req, res) => {
  if (req.user) {
    const blog = await Blog.create(req.body)
    blog.setUser(req.user)
    return res.json(blog)
  } else {
    return res.status(401).json()
  }
})

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    throw Error("not found")
  }
})

router.delete("/:id", async (req, res) => {
  if (!req.user) {
    throw Error("unauthorized")
  }
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) {
    throw Error("can't delete non existing")
  }

  if (blog.userId !== req.user.id) {
    throw Error("unauthorized")
  }
  blog.destroy()
  return res.status(204).json()
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
