import createApiClient from "./api.service";

class UserService {
	constructor(baseUrl = "/api/users") {
		this.api = createApiClient(baseUrl);
	}

	async registerUser(userData) {
        return (await this.api.post('/register', userData)).data;
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
    
    async logoutUser() {
        return (await this.api.get('/logout')).data;
    }

    async getProfile() {
        return (await this.api.get('/profile')).data;
         // Sử dụng GET method
    }

    async refreshToken() {
        return (await this.api.get('/refresh')).data;
    }

    async changePassword(passwordData) {
        return (await this.api.put('/changePassword', passwordData)).data;
    }
}

export default new UserService();
