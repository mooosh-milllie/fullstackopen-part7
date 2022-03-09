import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../reducers/userReducer';

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  return (
    <nav style={{ display: 'flex', alignItems: 'center', backgroundColor: 'gray' }}>
      <Link to={'/'} style={{ marginLeft: '10px', color: 'white', fontWeight: 400 }}>Home</Link>
      <Link to='/users' style={{ marginLeft: '10px', color: 'white', fontWeight: 400 }}>Visit Users</Link>
      <h4 style={{ padding: 0, margin: '0 10px' }}>Welcome {user.name}</h4>
      <button onClick={() => {
        dispatch(setUser(null));
        window.localStorage.removeItem('userLogBlogList');
        navigate('/login');
      }}>logout</button>
    </nav>
  );
};

export default Nav;