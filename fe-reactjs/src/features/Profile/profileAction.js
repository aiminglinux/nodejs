import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import profileApi from '../../api/profileApi';

import setAlert from '../Alert/alertAction';

export const getProfile = createAsyncThunk('GET_PROFILE', async (thunkApi) => {
  try {
    const res = await profileApi.get();
    return res.data;
  } catch (error) {
    const errors = error.response;
    thunkApi.dispatch(setAlert(errors.msg, 'danger'));

    return thunkApi.rejectWithValue(errors);
  }
});

export const createProfile = createAsyncThunk(
  'CREATE_PROFILE',
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

export const deleteAccount = createAsyncThunk(
  'ACCOUNT_DELETE',
  async (thunkApi) => {
    if (window.confirm('Are you sure? This action CAN NOT be undone!')) {
      try {
        await axios.delete('/api/profile');
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  }
);
