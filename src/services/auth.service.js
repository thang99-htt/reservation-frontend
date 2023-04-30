import createApiClient from "./api.service";

class AuthService {
    constructor(baseUrl = "/api/admin") {
        this.api = createApiClient(baseUrl);
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
}

export default new AuthService();
