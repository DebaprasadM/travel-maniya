import axios from "axios";

const API = axios.create({
  baseURL: "https://6mqmf6l1-5000.inc1.devtunnels.ms/api",
});

export const getMessages = () =>
  API.get("/contact").then((res) => res.data);

export const deleteMessage = (id) =>
  API.delete(`/contact/${id}`).then((res) => res.data);

