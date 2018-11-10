import { httpClientInstance } from "../utils/httpClient";

export async function pingServer() {
    const response = httpClientInstance.get("/api/ping");
    return response;
}

export async function findToilet(payload) {
    const response = httpClientInstance.get(
        `api/toilets/${payload.lat}/${payload.lng}/${payload.floor}/${
            payload.gender
        }`,
    );
    return response;
}
