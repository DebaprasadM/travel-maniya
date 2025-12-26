import axios from "axios";

const API = axios.create({
  baseURL: "https://travel-maniya.onrender.com/api",
});

export const getMessages = () =>
  API.get("/contact").then((res) => res.data);

export const deleteMessage = (id) =>
  API.delete(`/contact/${id}`).then((res) => res.data);

