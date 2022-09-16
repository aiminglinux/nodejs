import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import setAlert from '../Alert/alertAction';

export const registerUser = createAsyncThunk(
  'USER_REGISTER',
  async (payload, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/account/register', payload, config);
      localStorage.setItem('token', res.data.token);
      thunkApi.dispatch(setAlert('Register successfully!', 'success'));
      return res.data.token;
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

export const getUser = createAsyncThunk('USER_INFO', async (thunkApi) => {
  try {
    const res = await axios.get('/api/account/auth');
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
});

export const userLogin = createAsyncThunk(
  'USER_LOGIN',
  async (payload, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/account/login', payload, config);
      localStorage.setItem('token', res.data.token);
      return res.data.token;
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
