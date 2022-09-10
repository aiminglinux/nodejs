import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAlert from './alertAction';
// import setAuthToken from '../utils/setAuthToken';

// const userToken = localStorage.getItem('token')
//   ? localStorage.getItem('token')
//   : null;

const initialUserState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  userInfo: null,
};

export const registerAccount = createAsyncThunk(
  'user/register',
  async (payload, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/account/register', payload, config);
      thunkApi.dispatch(setAlert('Register successfully', 'success'));
      console.log('Register data: ', res.data);

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

// export const getAccountDetails = createAsyncThunk('/user/auth', async (payload) => {
//   if(localStorage.token) {
//     setAuthToken(localStorage.token)
//   }
//   try {
//     const res = await axios.get('/api/account/auth')
//     return res.data
//   } catch (error) {
//     console.log('Failed')
//   }
// })

export const loginAccount = createAsyncThunk(
  'user/login',
  async (payload, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/account/login', payload, config);
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

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.token = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
  extraReducers: {
    // Register user account
    [registerAccount.pending]: (state) => {
      state.loading = true;
    },
    [registerAccount.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [registerAccount.rejected]: (state) => {
      localStorage.removeItem('token');
      state.loading = false;
      state.isAuthenticated = false;
    },
    // Login with registered user account

    [loginAccount.pending]: (state) => {
      state.loading = true;
    },
    [loginAccount.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
      state.loading = false;
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    [loginAccount.rejected]: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
