

import axios from "axios";

const API = axios.create({
  baseURL: "https://decesionmakerapp-backend.com/api",
  withCredentials: true,
});

export default API;