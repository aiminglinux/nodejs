import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { alertAction } from './alertSlice';
import setAlert from './alertAction';

const initialUserState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  user: null,
};

export const registerAccount = createAsyncThunk(
  'user/register',
  async (payload, thunkApi) => {
    // Call API to register
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/account/register', payload, config);
      console.log(res);
      localStorage.setItem('token', res.data.token);
      return res.data.token;
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          thunkApi.dispatch(setAlert(error.msg, 'danger'));
        });
      }
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers: {
    [registerAccount.pending]: (state) => {
      state.loading = true;
    },
    [registerAccount.rejected]: (state) => {
      localStorage.removeItem('token');
      state.loading = false;
      state.isAuthenticated = false;
    },
    [registerAccount.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
