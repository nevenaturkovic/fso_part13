const router = require("express").Router()
const Session = require("../models/session")

router.delete("/", async (request, response) => {
  if (request.user) {
    await Session.destroy({
      where: {
        token: request.token,
      },
    })
    response.status(204).json()
  } else {
    throw new Error("unauthorized")
  }
})

module.exports = router
