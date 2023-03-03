const express = require("express")
const app = express()
const middleware = require("./util/middleware")

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const authorsRouter = require("./controllers/authors")
const readingListRouter = require("./controllers/readinglists")

app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/authors", authorsRouter)
app.use("/api/readinglists", readingListRouter)

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
