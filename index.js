const express = require("express")
const app = express()
require("express-async-errors")

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use((err, req, res, next) => {
  switch (err.message) {
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
})

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
