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

        };
    },
    methods: {
        async registerUser() {
            try {

                await UserService.registerUser(this.user);
                this.$router.push({ name: 'UserManagement' });
                console.log('User registered:', this.user);

            } catch (error) {
                console.error('Error registering user:', error);

            }
        }
    }
};
</script>
  
<style scoped>
/* Thêm các styles tùy chỉnh nếu cần */
</style>
  