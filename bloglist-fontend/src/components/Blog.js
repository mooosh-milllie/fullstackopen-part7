import React from 'react';
import { Link } from 'react-router-dom';
const Blog = ({ blog }) => {
  // const [blogVisibity, setBlogVisibility] =  useState(false);

  // const showDetails = {
  //   display: blogVisibity ? '' : 'none',
  // };
  const mainDiv = {
    border: '.5px solid black',
    padding: '5px',
    marginTop: '10px',
    borderRadius: '4px',
  };

  // const toggleBlogVisibility = () => {
  //   setBlogVisibility(!blogVisibity);
  // };

  return(
    <div style={mainDiv} className="blog-container">
      <Link to={`/blog/${blog.id}`}>{blog.title} : {blog.author}</Link>
      {/* <button id='button' onClick={(toggleBlogVisibility)} >{blogVisibity ? 'hide' : 'view'}</button> */}
      {/* <div id='blog-details' style={showDetails}>
        <p>{blog.url}</p>
        <div>
          <span className='likes-count'>Likes: {blog.likes}</span> <button id='like-button' onClick={() => likeBlog(blog.id)}>like</button>
        </div>
        <button onClick={() => {
          // eslint-disable-next-line no-restricted-globals
          if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            deleteBlog(blog.id);
          }
        }}>remove</button>
      </div> */}
    </div>
  );};

export default Blog;