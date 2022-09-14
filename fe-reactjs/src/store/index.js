import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import alertReducer from '../features/Alert/alertSlice';
import userReducer from '../features/User/userSlice';
import profileReducer from '../features/Profile/profileSlice';

const middleware = [thunk];

const rootReducer = {
  alert: alertReducer,
  user: userReducer,
  profile: profileReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware,
});
export default store;
