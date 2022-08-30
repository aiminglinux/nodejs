import { combineReducers } from '@reduxjs/toolkit';

import alertReducer from '../store/alertSlice';

export default combineReducers({
  alert: alertReducer,
});
