<template>
    <div class="container mt-5">
        <h2 class="mb-4 text-center">Đăng Ký Người Dùng</h2>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.prevent="registerUser">
                    <div class="mb-3">
                        <label for="name" class="form-label">Tên</label>
                        <input type="text" class="form-control" id="name" v-model="user.name" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" v-model="user.email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Mật khẩu</label>
                        <input type="password" class="form-control" id="password" v-model="user.password" required>
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Địa chỉ</label>
                        <input type="text" class="form-control" id="address" v-model="user.address">
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Số điện thoại</label>
                        <input type="text" class="form-control" id="phone" v-model="user.phone">
                    </div>
                    <button type="submit" class="btn btn-primary">Đăng Ký</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import UserService from "@/services/user.service";

export default {
    name: 'RegisterUser',
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                address: '',
                phone: ''
            },
            // Bạn có thể thêm trạng thái, thông báo lỗi ở đây nếu cần
        };
    },
    methods: {
        async registerUser() {
            try {
                // Gọi API để tạo người dùng mới
                await UserService.registerUser(this.user);
                console.log('User registered:', this.user);
                this.$router.push({name: 'Home'});
                // Thêm logic chuyển hướng sau khi đăng ký thành công nếu cần
            } catch (error) {
                console.error('Error registering user:', error);
                // Xử lý lỗi hoặc hiển thị thông báo lỗi
            }
        }
    }
};
</script>
  
<style scoped>
/* Thêm các styles tùy chỉnh nếu cần */
</style>
  