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
            // Logic cập nhật hồ sơ người dùng
            console.log('Profile updated:', this.user);
            // Bạn có thể gọi API ở đây để cập nhật hồ sơ
        },
        async getProfile() {
            try {
                this.user = await UserService.getProfile();
            } catch (error) {
                console.error('Lỗi khi tải thông tin người dùng:', error);
                // Xử lý lỗi hoặc hiển thị thông báo lỗi
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

/* Thêm các styles khác tùy theo nhu cầu thiết kế */
</style>
