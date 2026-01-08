import axios from "axios";

const api = axios.create({
  baseURL: "https://project-pms-backend.onrender.com/api",
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token && !req.url.includes("/auth/login")) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR ⭐
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired / invalid
      localStorage.removeItem("token");

      // optional: clear user data
      localStorage.removeItem("user");

      // redirect to login
      window.location.replace("/");
    }

    return Promise.reject(error);
  }
);

export default api;
