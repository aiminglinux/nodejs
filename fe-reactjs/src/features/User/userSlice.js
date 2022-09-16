import { createSlice } from '@reduxjs/toolkit';
import { registerUser, getUser, userLogin } from './userAction';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const initialState = {
  token,
  isAuthenticated: false,
  userInfo: null,
  loading: false,
};

const pendingReducer = (state) => {
  state.loading = true;
};

const rejectedReducer = (state) => {
  localStorage.removeItem('token');
  state.token = null;
  state.isAuthenticated = false;
  state.loading = false;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.token = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.userInfo = null;
    },
    deleteAccount(state) {
      localStorage.removeItem('token');
      state.token = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
  extraReducers: {
    [registerUser.pending]: pendingReducer,
    [registerUser.rejected]: rejectedReducer,
    [registerUser.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    [getUser.pending]: pendingReducer,
    [getUser.rejected]: rejectedReducer,
    [getUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.userInfo = action.payload;
    },

    [userLogin.pending]: pendingReducer,
    [userLogin.rejected]: rejectedReducer,
    [userLogin.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
