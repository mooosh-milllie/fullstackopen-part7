import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';
const userURL = 'http://localhost:3001/api/users';
const commentURL = 'http://localhost:3001/api/blogs/';

let token = null;
const setToken = newToken => {
  token = 'bearer ' + newToken;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};
const getUsers = async () => {
  const request = axios.get(userURL);
  const response = await request;
  return response.data;
};
const getUserBlogs = async (userID) => {

  const config = {
    headers: { Authorization: token }
  };
  const request = axios.get(`${userURL}/${userID}`, config);
  const response = await request;
  return response.data;
};

//Get comments from the comments route
const getBlogComments = async (userID) => {

  const config = {
    headers: { Authorization: token }
  };
  const request = axios.get(`${commentURL}/${userID}/comments`, config);
  const response = await request;
  return response.data;
};
const addBlogComments = async (userID, data) => {
  const config = {
    headers: { Authorization: token }
  };

  const newComment = {
    comment: data
  };
  const request = axios.post(`${commentURL}/${userID}/comments`, newComment, config);
  const response = await request;
  return response.data;
};

const getSingleBlog = async (userID) => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.get(`${baseUrl}/${userID}`, config);
  const response = await request;
  return response.data;
};

const addNewBlog = async (body) => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.post(baseUrl, body, config);
  const response = await request;
  return response.data;
};

const updatelikes = async(id, data) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const updateBlog = await axios.put(`${baseUrl}/${id}`, data, config);
  return updateBlog.data;
};

const deleteBlog = async(id) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const deletedBlog = await axios.delete(`${baseUrl}/${id}`, config);
  return deletedBlog;
};

const blogService = { getAll, getSingleBlog, setToken, getUserBlogs, getBlogComments, addBlogComments, addNewBlog, updatelikes, deleteBlog, getUsers };

export default blogService;