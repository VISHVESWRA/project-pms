import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://project-pms-backend.onrender.com/api",
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  // ❌ do not attach token for login/register
  if (token && !req.url.includes("/auth/login")) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
