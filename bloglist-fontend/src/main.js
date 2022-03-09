import React, { useEffect } from 'react';
import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import Home from './components/Home';
import UserBlog from './components/UserBlog';
import LoginForm from './components/Loginform';

const Main = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const notificationState = useSelector((state) => state.notification);
  useEffect(() => {
    const now = new Date().getTime();
    const loggedInUser = window.localStorage.getItem('userLogBlogList');
    if (loggedInUser) {
      const storedUser = JSON.parse(loggedInUser);
      if (now-storedUser.now > 1*60*60*1000) {
        window.localStorage.removeItem('userLogBlogList');
        dispatch(setUser(null));
      } else {
        dispatch(setUser(storedUser));
        blogService.getAll().then(blogs => {
          const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes);
          dispatch(setBlogs(sortedByLikes));
        }).catch(error => {
          console.log(error.message);
        });
        blogService.setToken(storedUser.token);
      }
    }
  },[]);

  if (!user) {
    return <LoginForm/>;
  }
  return (
    <div>

      <Routes>
        <Route path='/' element={<Home blogs={blogs} notificationState={notificationState} user={user} />}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/blog/:id' element={<UserBlog/>}/>
      </Routes>
    </div>
  );
};

export default Main;