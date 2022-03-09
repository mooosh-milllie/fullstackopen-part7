import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Blog from './Blog';
import BlogForm from './Blogform';
import Togglable from './Togglable';
import { createBlog, setDeleteBlog } from '../reducers/blogReducer';
import { setErrorNotification, setSuccessNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import Nav from './Nav';



const Home = ({ blogs }) => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const addBlogInfo = async(blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();

      const result = await blogService.addNewBlog(blogObject);
      dispatch(createBlog(result));
      dispatch(setSuccessNotification(`A new blog ${result.title} by ${result.author} added`));
      console.log(result);
      setTimeout(() => {
        dispatch(setSuccessNotification(null));
      }, 2000);
    } catch (error) {
      dispatch(setErrorNotification('unable to complete request, fill all required fields'));
      setTimeout(() => {
        dispatch(setErrorNotification(null));
      },5000);
    }
  };
  const deleteBlog = async(id) => {
    try {
      await blogService.deleteBlog(id);
      dispatch(setSuccessNotification('Blog has been deleted!'));
      dispatch(setDeleteBlog(id));
      setTimeout(() => {
        dispatch(setSuccessNotification(null));
      }, 3000);
      console.log(id);
    } catch (error) {
      dispatch(setErrorNotification('can\'t complete delete request'));
      setTimeout(() => {
        dispatch(setErrorNotification(null));
      }, 3000);
    }
  };
  return (
    <div>
      <Nav/>
      <div style={{ textAlign: 'center', fontWeight: '900' }}>
        <h1>BLOGS</h1>
      </div>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlogInfo} />
      </Togglable>

      {blogs.map((blog) => {
        return <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog}/>;
      })}
    </div>
  );
};

export default Home;