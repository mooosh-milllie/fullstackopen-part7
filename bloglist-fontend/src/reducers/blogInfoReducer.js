import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';


const blogInfoReducer = createSlice({
  name: 'bloginfo',
  initialState: {},
  reducers: {
    setBlogInfo(state, action) {
      return action.payload;
    },
    setLikeBlog(state, action) {
      const id = action.payload;
      if (state.id === id) {
        return { ...state, likes: state.likes + 1 };
      }
      return state;
    }
  }
});

export const { setBlogInfo, setLikeBlog } = blogInfoReducer.actions;

export const handleBloglikes = (id, data) => async (dispatch) => {
  const newData = { ...data, likes: data.likes + 1 };
  await blogService.updatelikes(id, newData);
  dispatch(setLikeBlog(id));
};
export default blogInfoReducer.reducer;