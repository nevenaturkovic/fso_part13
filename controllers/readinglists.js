const router = require("express").Router()

const { User, Blog, ReadingList } = require("../models")

router.post("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.body.userId)
    const blog = await Blog.findByPk(req.body.blogId)
    await user.addReading(blog)
    const readingListEntry = await ReadingList.findOne({
      where: {
        userId: req.body.userId,
        blogId: req.body.blogId,
      },
    })
    res.json(readingListEntry)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = router
