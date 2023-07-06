import axios from "axios";
import { RequestLoginParams, RequestCreateProjectParams } from '../types'

const API = axios.create({ baseURL: "http://localhost:8000" });
// const API = axios.create({ baseURL: "https://api.anygpt.org" });
API.interceptors.request.use((req) => {
    const userInfo: any = localStorage.getItem('user_storage');
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).state.token}`;
    return req;
});


export const signIn = (params: RequestLoginParams) => API.post("/user/signin", params);
export const generateCode = (params: RequestLoginParams) => API.post("/generatecode", params);
export const signup = (params: RequestLoginParams) => API.post("/user/signup", params);


// project
export const getProjects = () => API.get("/project");
export const createProject = (params: RequestCreateProjectParams) => API.post("/project/create", params);

// aichat
export const aiChat = (params: { id: string, role: string, prompt: string, state?: string }) => API.post("/aichat", params);

