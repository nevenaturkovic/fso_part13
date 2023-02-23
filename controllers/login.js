const jwt = require("jsonwebtoken")
const router = require("express").Router()

const { SECRET } = require("../util/config")
const User = require("../models/user")

router.post("/", async (request, response) => {
  const body = request.body
  console.log('a')
  const user = await User.findOne({
    where: {
      username: body.username,
    },
  })

  const passwordCorrect = body.password === "secret"
  console.log('b')

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    })
  }
  console.log('c')

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  console.log('d')

  const token = jwt.sign(userForToken, SECRET)
  console.log('e')

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
