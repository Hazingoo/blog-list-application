const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get("/", (request, response) => {
    Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.get("/:id", async (request,response) => {
console.log("trying");
  const blog = await Blog.findById(request.params.id)
  response.json(blog);
})

blogRouter.post('/', (request, response, next) => {
    console.log("trying")
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(200).json(result)
      })
      .catch(err => {
        console.log("working");
        response.status(400).json({
          error: err.message
        })
      })

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
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    }
    catch (err){
      next(err);
    }
  })
  module.exports = blogRouter
  