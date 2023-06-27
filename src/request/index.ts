import axios from "axios";
import { RequestLoginParams } from '../types'

const API = axios.create({ baseURL: "http://localhost:8000" });
// const API = axios.create({ baseURL: "https://api.charid.xyz" });
export const signIn = (params: RequestLoginParams) => API.post("/user/signin", params);
export const generateCode = (params: RequestLoginParams) => API.post("/generatecode", params);
export const signup = (params: RequestLoginParams) => API.post("/user/signup", params);