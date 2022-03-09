import React, { useState } from 'react';
import loginService from '../services/login';
import notification from '../components/Notification';
// import Togglable from '../components/Togglable';
import { setErrorNotification, setSuccessNotification } from '../reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs } from '../reducers/blogReducer';

import { setUser } from '../reducers/userReducer';
import blogService from '../services/blogs';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const notificationState = useSelector((state) => state.notification);
  const navigate = useNavigate();


  const loginHandler = async (event) => {
    event.preventDefault();

    const loginObject = {
      username: username,
      password: password
    };

    console.log('about to sign you in');
    var now = new Date().getTime();
    try {
      const user = await loginService.login(loginObject);
      window.localStorage.setItem(
        'userLogBlogList', JSON.stringify({ ...user, now: now })
      );

      dispatch(setUser(user));
      blogService.setToken(user.token);
      blogService.getAll().then( blogs => {
        const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes);
        dispatch(setBlogs(sortedByLikes));
        navigate('/');
      });
    } catch (exception) {
      console.log(exception.message);
      dispatch(setErrorNotification(exception.message));
      setTimeout(() => {
        dispatch(setSuccessNotification(null));
      },5000);
    }

  };

  return (
    <div>
      <div>
        <h2>Login to use application</h2>
        <notification.ErrorNotification message={notificationState.error}/>
        {/* <Togglable buttonLabel="login">
          <LoginForm
            loginUser={loginHandler}
          />
        </Togglable> */}
      </div>
      <form onSubmit={loginHandler}>
        <label>
              username
          <input
            id='username'
            type={'text'}
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
              password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button id='login-btn' type='submit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;