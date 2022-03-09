import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const addBlogInfo = async(event) => {
    event.preventDefault();

    await createBlog({
      title: title,
      author: author,
      url: url
    });

    setTitle('');
    setAuthor('');
    setURL('');

    setTimeout(() => {
      event.target.title.value = '';
      event.target.url.value = '';
      event.target.author.value = '';
    }, 5000);
  };

  return (
    <div>
      <form onSubmit={addBlogInfo}>
        <p>add new whatever this is</p>
        <input
          id='title'
          type={'text'}
          name='title'
          placeholder='title'
          onChange={({ target }) => setTitle(target.value)}
        />
        <input
          id='author'
          type={'text'}
          placeholder='author'
          name='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
        <input
          id='url'
          type={'text'}
          placeholder='url'
          name='url'
          onChange={({ target }) => setURL(target.value)}
        />
        <button id='create-btn' type="submit">create</button>
      </form>
    </div>
  );
};


export default BlogForm;