import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
  name: 'notification',
  initialState: { error: null, success: null },
  reducers: {
    setErrorNotification(state, action) {
      return state = { ...state, error: action.payload };
    },
    setSuccessNotification(state, action) {
      return state = { ...state, success: action.payload };
    }
  }
});

export const { setErrorNotification, setSuccessNotification } = notificationReducer.actions;
export default notificationReducer.reducer;