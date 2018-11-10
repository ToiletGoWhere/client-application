import { httpClientInstance } from "../utils/httpClient";

export async function pingServer() {
    const response = httpClientInstance.get("/api/ping");
    return response;
}
