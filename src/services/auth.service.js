import createApiClient from "./api.service";

class AuthService {
    constructor(baseUrl = "/api/") {
        this.api = createApiClient(baseUrl);
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
}

export default new AuthService();
