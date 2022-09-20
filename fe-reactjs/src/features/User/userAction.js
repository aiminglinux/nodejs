import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import userApi from '../../api/userApi';
import setAuthToken from '../../utils/setAuthToken';
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

export const userLogin = createAsyncThunk(
  'USER_LOGIN',
  async (payload, thunkApi) => {
    try {
      const res = await userApi.login(payload);
      localStorage.setItem('token', res.data.token);
      console.log('Login token: ', res.data.token);
      thunkApi.dispatch(loadUser(res.data.token));
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

export const loadUser = createAsyncThunk(
  'LOAD_USER',
  async ({ token }, thunkApi) => {
    try {
      setAuthToken(token);
      const res = await userApi.loadUser(token);
      console.log(res);
      return res.data;
    } catch (error) {
      thunkApi.dispatch(setAlert(error.response.data.msg, 'danger'));
      return thunkApi.rejectWithValue(error);
    }
  }
);
