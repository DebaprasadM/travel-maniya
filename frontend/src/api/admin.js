import axios from "axios";

const API = axios.create({
  baseURL: "https://6mqmf6l1-5000.inc1.devtunnels.ms/api",
});

export const adminLogin = (data) =>
  API.post("/admin/login", data).then((res) => res.data);
