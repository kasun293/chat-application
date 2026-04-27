import axios from "axios";
import { BASE_URL } from "../api";

const axiosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const getTokens = () => {
  return {
    accessToken: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

// const setTokens = ({ accessToken, refreshToken }) => {
//   localStorage.setItem("token", accessToken);
//   if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
// };

axiosApi.interceptors.request.use((config) => {
  const { accessToken } = getTokens();
  if (accessToken && accessToken !== "undefined") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/users/auth/refresh")
    ) {
      originalRequest._retry = true;
      // const { refreshToken } = getTokens();
      // if (refreshToken) {
      try {
        const response = await axiosApi.post(`users/auth/refresh`, {});
        const { accessToken } = response.data.payload;
        console.log({response})
        localStorage.setItem("token", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosApi(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
        // Optionally, you can clear tokens and redirect to login here
        handleLogout();
        // return Promise.reject(err);
      }
      // } else {
      //     if (window.location.pathname !== '/login') {
      //         localStorage.clear();
      //         window.location.href = '/login';
      //     }
      // }
    }

    // If it's a 401 from the REFRESH endpoint, don't retry—just log out.
    else if (
      error.response?.status === 401 &&
      originalRequest.url.includes("users/auth/refresh")
    ) {
      handleLogout();
    }
    return Promise.reject(error);
  },
);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};
export default axiosApi;
