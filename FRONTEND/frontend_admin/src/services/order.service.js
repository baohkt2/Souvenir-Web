import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }

    async createOrder(order) {
        return (await this.api.post('/', order)).data;
    }

    async getAllOrder() {
        return (await this.api.get('/')).data;
    }

    async getOrder(orderId) {
        return (await this.api.get(`/${orderId}`)).data;
    }

    async isPaid(orderId) {
        return (await this.api.put(`/${orderId}/pay`)).data;
    }

    async isdelivered(orderId) {
        return (await this.api.put(`/${orderId}/deliver`)).data;
    }

    async deleteOrder(orderId) {
        return (await this.api.delete(`/${orderId}`)).data;
    }

    async deleteAllOrder() {
        return (await this.api.delete('/')).data;
    }

}

export default new OrderService();
