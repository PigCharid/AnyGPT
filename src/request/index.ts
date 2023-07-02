import axios from "axios";
import { RequestLoginParams, RequestCreateProjectParams } from '../types'

// const API = axios.create({ baseURL: "http://localhost:8000" });
const API = axios.create({ baseURL: "https://api.anygpt.org" });
export const signIn = (params: RequestLoginParams) => API.post("/user/signin", params);
export const generateCode = (params: RequestLoginParams) => API.post("/generatecode", params);
export const signup = (params: RequestLoginParams) => API.post("/user/signup", params);


// project
export const getProjects = () => API.get("/project");
export const createProject = (params: RequestCreateProjectParams) => API.post("/project/create", params);

// aichat
export const aiChat = (params: { prompt: string }) => API.post("/aichat", params);

