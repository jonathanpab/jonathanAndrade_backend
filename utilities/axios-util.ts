import axios from "axios";
import {environment} from "./environment";

const instance = axios.create({
  baseURL: environment.urlExternalApis,
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
