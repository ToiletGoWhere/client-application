import axios from "axios";
export const httpClientInstance = axios.create({
    baseURL: "http://168.63.252.117:3000",
});
