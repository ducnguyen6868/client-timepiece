import axiosClient from "./axiosClient";

const authApi = {
  login: (data) => axiosClient.post("/login", data),
  register: (data) => axiosClient.post("/register", data),
  forgotPassword: (email) => axiosClient.post("/forgot-password", { email }),
  verifyOtp: (email, otp) => axiosClient.post("/verify-otp", { email, otp }),
  resetPassword: (data) => axiosClient.post("/reset-password", data),
};

export default authApi;
