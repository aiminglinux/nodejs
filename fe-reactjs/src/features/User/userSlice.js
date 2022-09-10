import { createSlice } from '@reduxjs/toolkit';
import { registerUser, getUserDetails } from './userAction';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const initialState = {
  token,
  isAuthenticated: false,
  userInfo: null,
  loading: false,
  errors: null,
};

const pendingReducer = (state) => {
  state.loading = true
}

const rejectedReducer =  (state, action) => {
  localStorage.removeItem('token')
  state.token = null
  state.isAuthenticated = false
  state.loading = false
  state.errors = action.payload
}

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
  },
  extraReducers: {
    [registerUser.pending]: pendingReducer,
    [getUserDetails.pending]: pendingReducer,
    [registerUser.rejected]: rejectedReducer,
    [getUserDetails.rejected]: rejectedReducer,
    [registerUser.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.errors = null
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.errors = null
      state.userInfo = action.payload
    }
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer