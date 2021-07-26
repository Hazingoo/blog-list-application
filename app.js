const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')


console.log('connecting to', process.env.mongoUrl);

mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(express.json());

app.use('/api/blogs', blogRouter);

module.exports = app
