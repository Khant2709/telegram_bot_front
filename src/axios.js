import axios from "axios";

const instance = axios.create({
  baseURL: "https://vlad.molodec.biz",
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
