import { createSlice } from '@reduxjs/toolkit';

const initialAlertState = [];

const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    setAlert(state, action) {
      const { id, msg, alertType } = action.payload;
      state.push({
        id,
        msg,
        alertType,
      });
    },
    removeAlert(state, action) {
      return state.filter((alert) => alert.id !== action.payload.id);
    },
  },
});

export const alertAction = alertSlice.actions;
export default alertSlice.reducer;
