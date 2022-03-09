import { createSlice } from '@reduxjs/toolkit';



const togglableReducer = createSlice({
  name: 'togglable',
  initialState: false,
  reducers: {
    setVisibility(state, action) {
      return action.payload;
    }
  }
});


export const { setVisibility } = togglableReducer.actions;

export default togglableReducer.reducer;