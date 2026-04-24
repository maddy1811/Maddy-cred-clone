import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth
export const signup = (data: { name: string; email: string; password: string }) =>
  API.post("/auth/signup", data);

export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

// User
export const getUser = () => API.get("/user");

// Payment
export const payBill = (amount: number) => API.post("/pay", { amount });

// Transactions
export const getTransactions = () => API.get("/transactions");