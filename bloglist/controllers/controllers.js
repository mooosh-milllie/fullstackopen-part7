const blogRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');

blogRouter.get('/', async (request, response) => {  
  const blog = await Blog.find({}).populate('user', {name: 1, username: 1});
  response.json(blog);
})

blogRouter.get('/:id', async (request, response) => {  
  const id = request.params.id;
  const blog = await Blog.findById(id).populate('user', {name: 1, username: 1});
  response.json(blog);
})

blogRouter.post('/',async (request, response) => {
  const body = request.body;
  const userId = request.user;
  console.log(userId);
  if (!userId) {
    return response.status(401).json({ error: 'Unauthorized Request' });
  }
  const user = await User.findById(userId);

  let newBlog;

  if (process.env.NODE_ENV === 'test') {
    newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: userId
    })
  } else {
    newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: userId
    })
  }

  const savedBlog = await newBlog.save();
  
  user.blog = user.blog.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const id = request.params.id;
  const blog = await Blog.findByIdAndUpdate(id, newBlog, {new: true})
  response.status(200).json(blog);
})

blogRouter.delete('/:id', (request, response) => {
  const id = request.params.id;
  const user = request.user;
  if (!user) {
    return response.status(500).json({ error: 'token missing or invalid' });
  }
  const userId =  User.findById(user).exec();
  const getBlog = Blog.findById(id).exec();
  Promise.all([userId, getBlog]).then(values => {
    if(values[0].id === values[1].user.toString()) {
      Blog.findByIdAndDelete(id).then(() => {
        response.status(204).end();
        editListOfBlogs(values[0]);
      });
    }
    else { 
      return response.status(401).json({
        error: 'Request not authorised'
      })
    }

    
  }).catch(error => console.log(error));

  const editListOfBlogs = async (newUser) => {
    console.log(id, newUser.blog);
    
    newUser.blog = newUser.blog.filter(blogId => blogId.toString() !==  id);
    await newUser.save();
  }
})
module.exports = blogRouter;