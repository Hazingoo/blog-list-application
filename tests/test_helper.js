const Blog = require('../models/blog')



// mongoose.Schema({
//     title: String,
//     author: String,
//     url: String,
//     likes: Number
//   })
const initialBlogs = [
    {
      title: "Guan is a human",
      author: "Guan frog",
      url: "Some human",
      likes: 30
    },
    {
        title: "Guan is a boy",
        author: "Guan boy",
        url: "Some boys",
        likes: 20
      },
      {
        title: "Guan is a human",
        author: "Guan frog",
        url: "Some human",
        likes: 30
      }
  ]

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }


  module.exports = {
    initialBlogs, blogsInDb
  }