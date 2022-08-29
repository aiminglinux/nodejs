import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialAlertState = [];
const id = uuidv4();
const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    setAlert(state, action) {
      state.push(id, action.payload);
    },
    // removeAlert(state) {},
  },
});

export default alertSlice.reducer;
