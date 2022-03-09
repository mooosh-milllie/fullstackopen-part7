import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return state = { ...action.payload };
    }
  }
});

export const { setUser } = userReducer.actions;

export default userReducer.reducer;