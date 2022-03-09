import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers } from '../reducers/getUsersReducer';
import blogService from '../services/blogs';
import Nav from './Nav';
import User from './User';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersinfo);
  useEffect(() => {

    const listAllUsers = async () => {
      const allUsers = await blogService.getUsers();
      dispatch(setAllUsers(allUsers));
    };
    listAllUsers();
  }, []);
  return (
    <div>
      <Nav/>
      <h1>Users</h1>

      <div>
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
            <tr>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => {
                return <User key={user.id} user={user}/>;
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Users;