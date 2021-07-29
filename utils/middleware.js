const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.message === "invalid User"){
    return response.status(208).json({
      error: error.message
    })
  }

  next(error)
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (request,response,next) => {
  console.log(request, "this is the testing");
  if(request.get("authorization")){
  request.token = getTokenFrom(request);
  }
  next();

}

const userExtractor = async (request, response, next) => {
  try{
    if(request.token){
      const tempUser = jwt.verify(request.token, process.env.SECRET)
      request.user = await User.findById(tempUser.id);
    }
    next()
  }
  catch (err){
    response.status(401).json({
      error: err.message
    })

  }
    }
 
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}