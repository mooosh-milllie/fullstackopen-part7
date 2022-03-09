const mongoose = require('mongoose');
const Comment = require('../models/comments');
const commentRouter = require('express').Router();
const Blog = require('../models/blogs');

commentRouter.post('/:id/comments', async (request, response) => {
  const userId = request.user;
  const id = request.params.id;
  const body = request.body.comment;
  if (!userId) {
    return response.status(401).json({error: 'please login to write comment'});
  }

  const comment = new Comment({
    comment: body,
    blogid: mongoose.Types.ObjectId(id),
    whocommented: mongoose.Types.ObjectId(userId)
  })
  console.log(mongoose.Types.ObjectId(id), mongoose.Types.ObjectId(userId));
  const savedComment = await comment.save();
  response.json(savedComment);
  const newBlog = await Blog.findById(id);
  newBlog.comment = newBlog.comment.concat(id);
  const savedBlog = await newBlog.save();
  console.log(newBlog);
})

commentRouter.get('/:id/comments', async(request, response) => {
  const userId = request.user;
  const id = request.params.id;

  if(!userId) {
    return response.status(401).json({error: 'please login to write comment'});
  }

  const comments = await Comment.find({blogid: id});
  response.send(comments);
})


module.exports = commentRouter;