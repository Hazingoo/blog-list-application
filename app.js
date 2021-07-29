const config = require('./utils/config')
const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')


console.log('connecting to', process.env.mongoUrl);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(express.json());
app.use(middleware.tokenExtractor);
app.use('/api/blogs', middleware.userExtractor, blogRouter)

app.use('/api/login', loginRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
