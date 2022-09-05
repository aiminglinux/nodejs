import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/userApi';

const initialUserState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export const register = createAsyncThunk('user/register', async (payload) => {
  // Call API to register
  const data = await userApi.register(payload);
  localStorage.setItem('access_token', data.token);
  // Save state to local storage

  return data.token;
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
