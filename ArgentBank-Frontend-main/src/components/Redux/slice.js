import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, 
    accessToken: null, 
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload; 
    },
    login: (state, action) => {
      state.user = action.payload.user; 
      state.accessToken = action.payload.token; 
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }; 
    },
  },
});

export const { setAccessToken, login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;