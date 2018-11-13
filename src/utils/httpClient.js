import axios from "axios";
export const httpClientInstance = axios.create({
    baseURL: "http://172.31.38.253:3000",
});
