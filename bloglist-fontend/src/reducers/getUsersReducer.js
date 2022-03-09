import { createSlice } from '@reduxjs/toolkit';

const usersReducer = createSlice({
  name: 'usersinfo',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return state = action.payload;
    }
  }
});

export const { setAllUsers } = usersReducer.actions;

export default usersReducer.reducer;