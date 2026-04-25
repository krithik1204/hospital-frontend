import axiosInstance from "./axiosInstance";

// REGISTER
export const register = (data) => {
  return axiosInstance.post("/api/patients/register", data);
};

// LOGIN
export const login = (data) => {
  return axiosInstance.post("/api/login", data);
};