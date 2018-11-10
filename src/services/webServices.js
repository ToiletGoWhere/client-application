import { httpClientInstance } from "../utils/httpClient";

export async function pingServer() {
    const response = httpClientInstance.get("/api/ping");
    return response;
}

export async function loadReview(id) {
    const response = httpClientInstance.get("/api/feedbacks/" + id);
    return response;
}
