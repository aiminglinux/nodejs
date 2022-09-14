import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import setAlert from '../Alert/alertAction';

export const getProfile = createAsyncThunk('user/profile', async (thunkApi) => {
  try {
    const res = await axios.get('/api/profile/me');
    return res.data;
  } catch (error) {
    const errors = error.response.data;
    thunkApi.dispatch(setAlert(errors.msg, 'danger'));

    return thunkApi.rejectWithValue(errors);
  }
});

export const createProfile = createAsyncThunk(
  'user/profile/create',
  async (payload, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/profile', payload, config);
      thunkApi.dispatch(setAlert('Profile updated!', 'success'));
      return res.data;
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          thunkApi.dispatch(setAlert(error.msg, 'danger'));
        });
        return thunkApi.rejectWithValue(errors);
      }
    }
  }
);
