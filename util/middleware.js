const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Session = require("../models/session")

require("express-async-errors")
const { SECRET } = require("../util/config")

const errorHandler = (err, req, res, next) => {
  switch (err.message) {
    case "unauthorized":
      res.status(401)
      break
    case "access denied":
      res.status(403)
      break
    case "not found":
      res.status(404)
      break
    case "can't delete non existing":
      res.status(400)
      break

    default:
      res.status(500)
  }
  res.json({ error: err.message })

  next(err)
}

const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request)
  request.token = token
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const session = await Session.findOne({
      where: {
        token: request.token,
      },
    })
    if (session) {
      const user = await User.findByPk(session.userId)
      if (!user.disabled) {
        request.user = user
      }
    }
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
}
