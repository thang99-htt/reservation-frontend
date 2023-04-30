import createApiClient from "./api.service";

class CustomerService {
    constructor(baseUrl = "/api/customers") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async updateStatus(id, data) {
        return (await this.api.put(`/update-status/${id}`, data)).data;
    }
}

export default new CustomerService();
