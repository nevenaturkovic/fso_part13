const router = require("express").Router()
const { userExtractor } = require("../util/middleware")

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

router.put("/:id", userExtractor, async (req, res) => {
  const rlEntry = await ReadingList.findByPk(req.params.id)

  if (!rlEntry) {
    throw new Error("not found")
  }

  if (req.user === undefined || req.user.id !== rlEntry.userId) {
    throw new Error("unauthorized")
  }

  rlEntry.read = req.body.read
  await rlEntry.save()
  res.status(200).json(rlEntry)
})

module.exports = router
