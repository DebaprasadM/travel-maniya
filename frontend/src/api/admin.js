import axios from "axios";

const API = axios.create({
  baseURL: "https://travel-maniya.onrender.com/api",
});

export const adminLogin = (data) =>
  API.post("/admin/login", data).then((res) => res.data);
