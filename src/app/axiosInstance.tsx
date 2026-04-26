import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/hospital",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;