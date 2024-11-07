<template>
    <div class="container mt-5 profile-edit-container">
        <h2 class="text-center mb-4">Chỉnh Sửa Hồ Sơ</h2>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <form @submit.prevent="updateProfile">
                    <div class="mb-3">
                        <label for="name" class="form-label">Tên</label>
                        <input type="text" class="form-control" id="name" v-model="user.name">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" v-model="user.email" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Địa chỉ</label>
                        <input type="text" class="form-control" id="address" v-model="user.address">
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Số điện thoại</label>
                        <input type="text" class="form-control" id="phone" v-model="user.phone">
                    </div>
                    <button type="submit" class="btn btn-primary">Cập Nhật</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import UserService from "@/services/user.service";

export default {
    name: 'ProfileEdit',
    data() {
        return {
            user: {
                name: '',
                email: '',
                address: '',
                phone: ''
            }
        };
    },
    methods: {
        async updateProfile() {
            try {
                await UserService.updateProfile(this.user);           
                this.$router.push({name: 'UserManagement'});
                console.log('Profile updated:', this.user);
        
            } catch (error) {
                console.error('Error updating profile:', error);
        
            }
        },
        async getProfile() {
            try {
                const userId = this.$route.params.id; 
                this.user = await UserService.getUserProfileById(userId);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        },

    },
    mounted() {
        this.getProfile();
    }
};
</script>
  
<style scoped>
.profile-edit-container {
    padding: 20px;
}

</style>
