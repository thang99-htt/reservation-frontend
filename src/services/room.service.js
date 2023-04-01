import createApiClient from "./api.service";

class RoomService {
    constructor(baseUrl = "/api/rooms") {
        this.api = createApiClient(baseUrl);
    }

    async getAll(capacity, type) {
        let query = "";
        if (capacity && type) {
          query = `?capacity=${capacity}&type=${type}`;
        } else if (capacity) {
          query = `?capacity=${capacity}`;
        } else if (type) {
          query = `?type=${type}`;
        }
        return (await this.api.get(`/${query}`)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
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
}

export default new RoomService();
