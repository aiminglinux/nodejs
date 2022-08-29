import { configureStore, createSlice } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';

// import rootReducer from '../reducers';
// import alertReducer from './alert';

const middleware = [thunk];

const initialAlertState = [];

const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    setAlert(state, action) {
      state.push(action.payload);
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
