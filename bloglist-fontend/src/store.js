import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import togglableReducer from './reducers/togglableReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/getUsersReducer';
import blogInfoReducer from './reducers/blogInfoReducer';


const store = configureStore({
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
  reducer: {
    blogs: blogReducer,
    bloginfo: blogInfoReducer,
    notification: notificationReducer,
    user: userReducer,
    togglable: togglableReducer,
    usersinfo: usersReducer
  }
});


export default store;