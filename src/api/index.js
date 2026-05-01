import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getApiBaseUrl() {
  if (import.meta.env.DEV) {
    return "http://localhost:5000/api";
  } else {
    return "food-management-system-server-eight.vercel.app/api";
  }
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Product APIs
export const productAPI = {
  getAll: (category) => api.get("/products", { params: { category } }),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get("/products/categories"),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Order APIs
export const orderAPI = {
  create: (data) => api.post("/orders", data),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: () => api.get("/orders"),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  getStats: () => api.get("/orders/stats/overview"),
};

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (email, password) =>
    api.post("/auth/register", { email, password }),
  verify: () => api.get("/auth/verify"),
};

export default api;
