import createApiClient from "./api.service";

class ProductService {
	constructor(baseUrl = "/api/products") {
		this.api = createApiClient(baseUrl);
	}
	async getAll(params) {
		try {
			const response = await this.api.get("/", { params });
			return response.data;
		} catch (error) {
			// Xử lý lỗi hoặc trả về lỗi
			console.error('Error fetching data:', error);
			throw error;
		}
	}
	
	async getCategory(data) {
		return (await this.api.get("/", data)).data;
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

export default new ProductService();