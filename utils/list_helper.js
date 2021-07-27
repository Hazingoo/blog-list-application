const lodash = require('lodash');
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc,blog)=> {
        return acc + blog.likes
    }, 0);
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((acc,blog) => {
        if(acc.likes <= blog.likes) return blog;
        return acc
    })
}

const mostBlogs = (blogs) => {
    const maxBlog = lodash.maxBy(blogs, (blog) => blog.blogs);
    return {
        author: maxBlog.author,
        blogs: maxBlog.blogs
    }
}

const mostLikes = (blogs) => {
    const maxBlog = lodash.maxBy(blogs, (blog) => blog.likes);
    return {
        author: maxBlog.author,
        blogs: maxBlog.blogs
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}