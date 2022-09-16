import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import setAlert from '../Alert/alertAction';

export const getProfile = createAsyncThunk('GET_PROFILE', async (thunkApi) => {
  try {
    const res = await axios.get('/api/profile/me');
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

export const addExperience = createAsyncThunk(
  'ADD_EXP',
  async (payload, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.put('/api/profile/experience', payload, config);
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

export const addEducation = createAsyncThunk(
  'ADD_EDUCATION',
  async (payload, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.put('/api/profile/education', payload, config);
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

export const deleteEducation = createAsyncThunk(
  'DELETE_EDUCATION',
  async (payload, thunkApi) => {
    try {
      await axios.delete(`/api/profile/education/${payload}`);
      thunkApi.dispatch(setAlert('Education record deleted!', 'success'));
      thunkApi.dispatch(getProfile());
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteExperience = createAsyncThunk(
  'DELETE_EXPERIENCE',
  async (payload, thunkApi) => {
    try {
      await axios.delete(`/api/profile/experience/${payload}`);
      thunkApi.dispatch(setAlert('Experience record deleted!', 'success'));
      thunkApi.dispatch(getProfile());
    } catch (error) {
      return thunkApi.rejectWithValue(error);
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
