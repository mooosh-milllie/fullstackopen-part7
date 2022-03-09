import { createSlice } from '@reduxjs/toolkit';

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      state.push(action.payload);
    }
  },
});

export const { setBlogs, createBlog, setLikeBlog, setDeleteBlog } = blogReducer.actions;

export default blogReducer.reducer;
