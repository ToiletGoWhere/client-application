import axios from "axios";
export const httpClientInstance = axios.create({
    baseURL: "192.168.1.89:3000",
});
