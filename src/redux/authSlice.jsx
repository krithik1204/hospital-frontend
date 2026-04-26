import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const role=localStorage.getItem("role");

const authSlice = createSlice({
  name: "auth",
  initialState: {
   
    roles: [],
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
       const { token, roles } = action.payload;
      console.log(roles);
      state.isAuthenticated = true;
      const rawRoles = roles;
      state.roles = Array.isArray(rawRoles) ? rawRoles : [];
      localStorage.setItem("token",token);
     
    },

    logout: (state) => {
      state.token = null;
      state.role = [];
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;