import axios from "axios";

const api = axios.create({
  //   baseURL: "http://localhost:5000/api",
  baseURL: "https://project-pms-server.onrender.com/api",
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
