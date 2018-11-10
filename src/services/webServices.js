import { httpClientInstance } from "../utils/httpClient";

export async function pingServer() {
    const response = httpClientInstance.get("/api/ping");
    return response;
}

export async function contributeNewToiletServer(payload) {
    console.log("webServices called:");
    console.log(payload);
    const response = httpClientInstance.post("/api/auth/toilets", payload);
    return response;
}

export async function confirmToiletServer(payload) {
    console.log("webServices called:");
    console.log(payload);
    const response = httpClientInstance.put("/api/auth/toilets/" + payload.tolietId);
    return response;
}

export async function findToilet(payload) {
    const response = httpClientInstance.get(
        `api/toilets/${payload.lat}/${payload.lng}/${payload.floor}/${payload.gender}`,
    );
    return response;
}

