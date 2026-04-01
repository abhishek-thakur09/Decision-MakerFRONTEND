

import axios from "axios";

const API = axios.create({
  baseURL: "https://dsa-hustler-backend.onrender.com/api",
  withCredentials: true,
});

export default API;