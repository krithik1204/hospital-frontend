import axiosInstance from "../../app/axiosInstance";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

// REGISTER
export const register = (data: RegisterData) => {
  return axiosInstance.post("/api/patients/register", data);
};

// LOGIN
export const login = (data: LoginData) => {
  return axiosInstance.post("/api/login", data);
};

// APPOINTMENTS
export const getAllAppointments = (token: string) => {
  return axiosInstance.get("/api/appointments/viewAll", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getPatientAppointments = (patientId: string, token: string) => {
  return axiosInstance.get(`/api/appointments/patient/${patientId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};