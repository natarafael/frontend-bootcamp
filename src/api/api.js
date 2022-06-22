import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3030/",
  withCredentials: false,
});

export function Fishes() {
  return api.get("fishes");
}
