const supertest = require('supertest')
const helper = require('./test_helper');
const listHelper = require('../utils/list_helper')
const app= require('../app');
const api = supertest(app)

const Blog = require('../models/blog')
beforeEach(async () => {
  await Blog.deleteMany({})
  for(let item of helper.initialBlogs){
    let blogObject = new Blog(item)
    await blogObject.save()
  }
})
test('contains length', async() => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3);
})

test("does have default likes", async() => {
  const newBlog = {
    title: "Guan is a frog",
    author: "Guan strong",
    url: "Some human"
  }
  const response = await api
  .post('/api/blogs')
  .send(newBlog)

  expect(response.body.likes).toBeDefined();

})

test("expect 400 Bad request", async() => {
  const newBlog = {
    author: "Guan strong",
    likes: 3
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test("has posted", async() => {
  const newBlog = {
    title: "Guan is a frog",
    author: "Guan strong",
    url: "Some human",
    likes: 30
  }
  await api.post('/api/blogs')
  .send(newBlog)

  
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1);

})

test("to be defined", async() => {
  const response = await api.get('/api/blogs')
  expect(response.body[0]._id).not.toBeDefined();
})
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes" , () => {
  test("returns total likes", () => {
    const blogs =[
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 13,
        __v: 0
      }
    ]
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(33)
  })

  test("returns total likes", () => {
    const blogs =[
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 13,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 4,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0
      }
    ]
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(20)
  })
})

describe("most favourite", () => {
  test("one favourite", () => {
    const blog = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    ]
    const result = listHelper.favoriteBlog(blog);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    });
  })

  test("one favourite", () => {
    const blog = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 16
      }
    ]
    const result = listHelper.favoriteBlog(blog);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 16
    });
  })


})

describe("most blogs", () => {
  test("most blog 1", () => {
    const blogs = [{
      author: "Robert C. Martin",
      blogs: 3
    },
    {
      author: "Jonathan C. Martin",
      blogs: 6
    }  ]
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Jonathan C. Martin",
      blogs: 6
    })
  })
})

