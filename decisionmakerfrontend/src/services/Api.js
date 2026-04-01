

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9999/api",
});

export default API;