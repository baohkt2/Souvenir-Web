<template>
    <div class="container profile-container" v-if="user">
        <h2 class="mb-4">Thông Tin Cá Nhân</h2>
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">{{ user.name }}</h4>
                <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
                <p class="card-text"><strong>Địa chỉ:</strong> {{ user.address || 'Chưa cập nhật' }}</p>
                <p class="card-text"><strong>Số điện thoại:</strong> {{ user.phone || 'Chưa cập nhật' }}</p>
                <p class="card-text"><strong>Vai trò:</strong> {{ user.role }}</p>
                <router-link class="btn btn-primary" to="profile/edit">Chỉnh Sửa Hồ Sơ</router-link>
                <router-link class="btn btn-secondary ml-2" to="/change-password">Đổi Mật Khẩu</router-link>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Đang tải dữ liệu...</p>
    </div>
</template>

  
<script>
import UserService from "@/services/user.service";

export default {
    name: 'Profile',
    data() {
        return {
            user: null,
        };
    },
    methods: {
        async getProfile() {
            try {
                this.user = await UserService.getProfile();
            } catch (error) {
                console.error('Lỗi khi tải thông tin người dùng:', error);
                // Xử lý lỗi hoặc hiển thị thông báo lỗi
            }
        }
    },
    mounted() {
        this.getProfile();
    }
};
</script>
  
<style scoped>
.profile-container {
    max-width: 600px;
    margin: 0 auto;
}

/* Thêm các styles tùy chỉnh khác */
</style>
  