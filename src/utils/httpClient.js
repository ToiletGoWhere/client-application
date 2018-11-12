import axios from "axios";
export const httpClientInstance = axios.create({
    baseURL: "http://172.25.102.0:3000",
});
