import { createSlice } from '@reduxjs/toolkit';

// const initialAlertState = [];

const alertSlice = createSlice({
  name: 'alert',
  initialState: [],
  reducers: {
    setAlert(state, action) {
      state.push({
        ...action.payload,
      });
    },
    removeAlert(state, action) {
      return state.filter((alert) => alert.id !== action.payload.id);
    },
  },
});

export const alertAction = alertSlice.actions;
export default alertSlice.reducer;
