import createApiClient from "./api.service";

class RoomService {
    constructor(baseUrl = "/api/rooms") {
        this.api = createApiClient(baseUrl);
    }

    async getAll(capacity, type, status) {
        let query = "";
        if (capacity && type && status) {
          query = `?capacity=${capacity}&type=${type}&status=${status}`;
        } else if (capacity && type) {
            query = `?capacity=${capacity}&type=${type}`;
        } else if (capacity && status) {
            query = `?capacity=${capacity}&status=${status}`;
        } else if (type && status) {
            query = `?type=${type}&status=${status}`;
        } else if (capacity) {
          query = `?capacity=${capacity}`;
        } else if (type) {
          query = `?type=${type}`;
        } else if (status) {
            query = `?status=${status}`;
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
