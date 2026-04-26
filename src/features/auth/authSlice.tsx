import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  roles: string[];
  email: string;
  userId: string | null;
  isAuthenticated: boolean;
}

interface LoginPayload {
  token: string;
  roles: string[];
  email?: string;
  userId?: string;
}

const storedToken = localStorage.getItem("token");
const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]");
const storedEmail = localStorage.getItem("email") || "";
const storedUserId = localStorage.getItem("userId") || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: storedToken || null,
    roles: Array.isArray(storedRoles) ? storedRoles : [],
    email: storedEmail,
    userId: storedUserId,
    isAuthenticated: Boolean(storedToken),
  } as AuthState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      const { token, roles, email, userId } = action.payload;
      state.token = token;
      state.email = email || state.email || "";
      state.userId = userId || null;
      state.isAuthenticated = true;
      state.roles = Array.isArray(roles) ? roles : [];
      localStorage.setItem("token", token);
      localStorage.setItem("roles", JSON.stringify(state.roles));
      localStorage.setItem("email", state.email);
      if (userId) localStorage.setItem("userId", userId);
    },

    logout: (state) => {
      state.token = null;
      state.roles = [];
      state.email = "";
      state.userId = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;