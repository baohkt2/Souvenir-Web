<template>
    <div class="container mt-4">
        <h2 class="mb-4">Quản Lý Người Dùng</h2>
        <div class="mb-3 d-flex justify-content-between align-items-center">
            <button class="btn btn-primary" @click="addUser">Thêm Người Dùng</button>
            <input type="text" class="form-control w-25" placeholder="Tìm kiếm người dùng..." v-model="searchTerm"
                @input="searchUsers">
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Vai trò</th>
                    <th scope="col">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user._id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <button class="btn btn-info btn-sm ms-3" @click="editUser(user._id)">Sửa</button>
                        <button class="btn btn-danger btn-sm ms-3" @click="deleteUser(user._id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
    name: 'UserManagement',
    data() {
        return {
            users: [],
            allUsers: [],
            searchTerm: null
        };
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await UserService.getUsers(); // Gọi API để lấy danh sách người dùng
                this.users = response;
                this.allUsers = this.users;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async deleteUser(userId) {
            try {
                await UserService.deleteUser(userId); // Gọi API để xóa người dùng
                this.fetchUsers(); // Cập nhật lại danh sách người dùng
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },
        addUser() {
            this.$router.push({ name: 'RegisterUser' });
        },
        editUser(userId) {
            this.$router.push({ name: 'ProfileEdit', params: { id: userId } });
        },
        searchUsers() {
        if (this.searchTerm && this.allUsers) {
            this.users = this.allUsers.filter(user =>
                user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        } else {
            // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ danh sách
            this.users = this.allUsers;
        }
    },

    },
    mounted() {
        this.fetchUsers();
    }
};
</script>

<style scoped>
/* Thêm các styles tùy chỉnh nếu cần */
</style>
