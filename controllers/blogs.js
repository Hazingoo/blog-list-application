const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user")

    response.json(blogs);

})

blogRouter.get("/:id", async (request,response) => {
console.log("trying");
  const blog = await Blog.findById(request.params.id)
  response.json(blog);
})

blogRouter.post('/', async (request, response, next) => {
    try{
    const user = request.user;
    console.log(user);
    const body = request.body
    console.log(request.token, "this is the token");
    if (!request.token || !user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = new Blog({
      title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
    })

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
      response.status(200).json(savedBlog);
    }
    catch (err) {
        console.log("working");
        response.status(400).json({
          error: err.message
        })

      }
      })

    blogRouter.patch('/:id', async (request, response, next) => {
      const {likes} = request.body
      const blog = await Blog.findById(request.params.id);
      console.log(blog);
      const newBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: likes
      }
    
      Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
        .then(updatedNote => {
          response.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
    })

  blogRouter.delete('/:id', async (request,response,next)=> {
    try{
      const user = request.user
      const blog =  await Blog.findById(request.params.id)
      if (!request.token || !user|| !(user.id.toString() === blog.user.toString())) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    }
    catch (err){
      next(err);
    }
  })
  module.exports = blogRouter
  