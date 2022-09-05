import { configureStore } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';

// import rootReducer from '../reducers';
import alertReducer from './alertSlice';
import userReducer from './userSlice';

const middleware = [thunk];

const rootReducer = {
  alert: alertReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware,
});
export default store;
