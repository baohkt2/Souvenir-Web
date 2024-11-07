<template>
    <div class="logout-container d-flex justify-content-center align-items-center">
        <div class="logout-content text-center">
            <h2>Đã Đăng Xuất</h2>
            <p>Bạn đã đăng xuất thành công khỏi hệ thống.</p>
            <router-link to="/" class="btn btn-primary">Quay về Trang Chủ</router-link>
        </div>
    </div>
</template>

<script>
import UserService from "@/services/user.service"
import { UserStore } from "@/stores/userStore"
export default {
    name: 'Logout',
    mounted() {
        this.logOut();
    },
    methods: {
        async logOut() {
            try {
                // Gọi API đăng xuất
                await UserService.logoutUser();
                // Cập nhật store
                const userStore = UserStore();
                userStore.logOut();
                // Chuyển hướng người dùng về trang chủ hoặc trang đăng nhập
                 // Hoặc đường dẫn đến trang đăng nhập
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error during logout:', error);
            }
        }
    }
};
</script>

<style scoped>
.logout-container {
    height: 100vh;
    background-color: rgba(255, 235, 230, 0.5);
    /* Màu nền nhẹ nhàng */
}

.logout-content {
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logout-content h2 {
    color: #ff6b6b;
    /* Màu sắc phù hợp */
    margin-bottom: 15px;
}

.logout-content p {
    margin-bottom: 20px;
}
</style>
