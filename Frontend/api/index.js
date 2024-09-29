import axios from "axios";
import { config } from "../constants";

const instance = axios.create({
  baseURL: config.url.API_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true;
  }
  return config;
});

//instance.interceptors.response.use attaches a function to handle response and error scenarios during Axios requests made using instance.
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalReq = error.config;
    if (
      error?.response?.status == 401 &&
      !originalReq._retry &&
      !originalReq._loggedOut
    ) {
      originalReq._retry = true;
      try {
        const refreshResponse = await instance.get("/auth/refresh");
        if (refreshResponse.status >= 200 && refreshResponse.status < 300) {
          const accessToken = refreshResponse.data.accessToken;
          localStorage.setItem("token", JSON.stringify(accessToken));
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          return instance(originalReq);
        } else {
          console.error("Refresh token expired or invalid");
          originalReq._retry = false;
          originalReq._loggedOut = true;
          return Promise.reject(error);
        }
      } catch (error) {
        console.log("Error refreshing token:", error);
        localStorage.removeItem("token");
        originalReq._retry = false;
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
