<template>
    <div class="login-container">
        <div class="login-card">
            <h2 class="login-title">Đăng Nhập</h2>
            <form @submit.prevent="login">
                <div class="form-group">
                    <input type="email" id="email" v-model="credentials.email" placeholder="Email" required>
                    <input type="checkbox" id="remember-me" v-model="rememberMe">
                    <label for="remember-me">Ghi nhớ tài khoản</label>
                </div>
                <div class="form-group">
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="credentials.password"
                        placeholder="Mật khẩu" required>
                    <button type="button" @click="togglePassword">{{ showPassword ? 'Ẩn' : 'Hiện' }} Mật khẩu</button>
                </div>
                <button type="submit" class="login-btn">Đăng Nhập</button>
            </form>
            <p class="register-prompt">
                Chưa có tài khoản? <router-link to="/register">Đăng ký ngay</router-link>
            </p>
            <div v-if="emailError" class="alert alert-danger mt-3">Email không hợp lệ.</div>
            <div v-if="passwordError" class="alert alert-danger mt-3">Mật khẩu không hợp lệ.</div>
            <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/user.service';
import { UserStore } from '@/stores/userstore';

export default {
    name: 'Login',
    data() {
        return {
            // dữ liệu hiện có
            credentials: {
                email: '',
                password: ''
            },
            rememberMe: false,
            showPassword: false,
            error: null,
            emailError: false,
            passwordError: false
        };
    },
    mounted() {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            this.credentials.email = savedEmail;
            this.rememberMe = true;
        }
    },
    computed: {
        isEmailValid() {
            return this.credentials.email.includes('@');
        },
        isPasswordValid() {
            return this.credentials.password.length >= 6;
        }
    },
    methods: {
        async login() {
            this.emailError = !this.isEmailValid;
            this.passwordError = !this.isPasswordValid;

            if (this.emailError || this.passwordError) {
                this.error = 'Thông tin đăng nhập không hợp lệ.';
                return;
            }

            try {
                const response = await UserService.loginUser(this.credentials);
                if (response) {
                    const userStore = UserStore();
                    userStore.logIn(); // Cập nhật trạng thái đăng nhập trong store
                    this.$router.push({ name: 'Home' }); // Chuyển hướng đến trang chủ
                    if (this.rememberMe) {
                        localStorage.setItem('savedEmail', this.credentials.email); // Lưu email nếu người dùng chọn ghi nhớ
                    } else {
                        localStorage.removeItem('savedEmail'); // Xóa email lưu trữ nếu không chọn ghi nhớ
                    }
                }
            } catch (e) {
                this.error = 'Lỗi đăng nhập. Vui lòng thử lại.'; // Hiển thị thông báo lỗi người dùng thân thiện
            }
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Lobster&display=swap');


.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    /* Nền mờ */
}

.login-card {
    font-family: 'Poppins', sans-serif;
    /* Sử dụng Poppins cho toàn bộ card */
    background: #fff5e6;
    /* Màu nền màu vàng nhạt */
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.login-title {
    font-family: 'Lobster', cursive;
    /* Sử dụng Lobster cho tiêu đề */
    text-align: center;
    margin-bottom: 20px;
    color: #ffa500;
    /* Màu chữ màu vàng đậm */
    font-family: 'Open Sans', sans-serif;
}

.form-group {
    margin-bottom: 15px;
    position: relative;
}

.form-group input[type="email"],
.form-group input[type="password"],
.form-group input[type="text"] {
    width: 100%;
    padding: 10px;
    /* Styles hiện có */
}

.form-group input[type="checkbox"] {
    margin-right: 10px;
}

.toggle-password-btn {
    background: none;
    border: none;
    color: #007bff;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
}

.login-btn {
    width: 100%;
    padding: 10px;
    background-color: #ffad33;
    /* Màu nút màu vàng đậm */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-btn:hover {
    background-color: #cc8400;
}

.error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
    font-family: 'Open Sans', sans-serif;
}

.register-prompt {
    text-align: center;
    margin-top: 15px;
}

.register-prompt a {
    color: #007bff;
    text-decoration: none;
}

.register-prompt a:hover {
    text-decoration: underline;
}

.invalid-feedback {
    display: block;
    color: #dc3545;
    /* Màu sắc của Bootstrap cho thông báo lỗi */
    margin-top: 5px;
}

/* Cải thiện UI của toggle password và checkbox */
.toggle-password-btn {
    /* styles hiện tại */
    font-size: 0.8em;
}

.form-group input[type="checkbox"] {
    margin-top: 5px;
}


/* Khi có lỗi, thêm border màu đỏ cho input */
.form-group input[type="email"]:invalid,
.form-group input[type="password"]:invalid {
    border-color: #dc3545;
}
</style>

