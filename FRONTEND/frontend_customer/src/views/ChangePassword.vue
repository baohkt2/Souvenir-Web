<template>
    <div class="container my-4">
        <h2>Đổi Mật Khẩu</h2>
        <form @submit.prevent="changePassword">
            <div class="mb-3">
                <label for="oldPassword" class="form-label">Mật Khẩu Cũ</label>
                <input type="password" class="form-control" id="oldPassword" v-model="oldPassword" required>
            </div>
            <div class="mb-3">
                <label for="newPassword" class="form-label">Mật Khẩu Mới</label>
                <input type="password" class="form-control" id="newPassword" v-model="newPassword" required>
            </div>
            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Xác Nhận Mật Khẩu Mới</label>
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
            </div>
            <button type="submit" class="btn btn-primary">Thay Đổi Mật Khẩu</button>
        </form>
    </div>
</template>
<script>
import UserService from '@/services/user.service';

export default {
    name: 'ChangePassword',
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
    },
    methods: {
        async changePassword() {
            if (this.newPassword !== this.confirmPassword) {
                alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
                return;
            }
            try {
                await UserService.changePassword({
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword
                });
                alert('Mật khẩu đã được thay đổi.');
                this.oldPassword = '';
                this.newPassword = '';
                this.confirmPassword = '';
                this.$router.push({name: 'Home'});
            } catch (error) {
                console.error('Lỗi khi thay đổi mật khẩu:', error);
                alert('Có lỗi xảy ra khi thay đổi mật khẩu.');
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>