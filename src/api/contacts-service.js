import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/contacts",
  headers: {
    "Content-Type": "application/json",
  },
});