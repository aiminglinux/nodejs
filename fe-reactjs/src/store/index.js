import { configureStore, createSlice } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';
// import rootReducer from '../reducers';
// import alertReducer from './alert';

const middleware = [thunk];

const initialAlertState = [];

const id = uuidv4();
const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    setAlert(state, action) {
      state.push({
        id,
      });
      console.log(action.payload.alertType);
    },
    // removeAlert(state) {},
  },
});

const store = configureStore({
  reducer: alertSlice.reducer,
  middleware,
});

export const alertAction = alertSlice.actions;
export default store;
