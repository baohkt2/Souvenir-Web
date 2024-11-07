import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }

    async loginUser(userData) {
        try {
            const response = await this.api.post('/login', userData);
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    async registerUser(data) {
        return (await this.api.post('/register',data)).data;
    }

    async logoutUser() {
        return (await this.api.get('/logout')).data;
    }

    async getProfile() {
        return (await this.api.get('/profile')).data;
    }

    async updateProfile(userData) {
        try {
            return (await this.api.put('/profile', userData)).data;
        } catch (error) {
            console.error('Error during profile update:', error);
            throw error;
        }
    }

    async getUserProfileById(userId) {
        return (await this.api.get(`/profile/${userId}`)).data;
    }

    async refreshToken() {
        return (await this.api.get('/refresh')).data;
    }

    async changePassword(passwordData) {
        return (await this.api.post('/changePassword', passwordData)).data;
    }

    async getUsers() {
        return (await this.api.get('/userlist')).data;
    }


    async deleteUser(userId) {
        return (await this.api.delete(`/${userId}`)).data;
    }
}

export default new UserService();
