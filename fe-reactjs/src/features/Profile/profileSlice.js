import { createSlice } from '@reduxjs/toolkit';
import { getProfile } from './profileAction';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      state.repos = [];
      state.loading = false;
    },
  },
  extraReducers: {
    [getProfile.pending]: (state) => {
      state.loading = true;
    },
    [getProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
