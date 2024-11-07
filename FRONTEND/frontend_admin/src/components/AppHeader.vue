<template>
    <header class="admin-header text-center rouded-5">
        <!-- Logo -->
        <div class="logo">
            <h1>Memories</h1>
        </div>

        <!-- Icon bar -->
        <div class="icon-bar d-flex justify-content-center">
            <div class="icon-item">
                <router-link to="/">
                    <i class="fa-solid fa-house"></i>
                    <span class="icon-text">Trang chủ</span>
                </router-link>
            </div>
            <div class="icon-item">
                <router-link :to="userLink">
                    <i class="fa-solid fa-user"></i>
                    <span class="icon-text">Tài khoản</span>
                </router-link>
            </div>
            <div class="icon-item">
                <router-link to="/logout" v-if="login">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span class="icon-text">Đăng xuất</span>
                </router-link>
            </div>
        </div>
    </header>
</template>

<script>
import { UserStore } from "@/stores/userStore";
export default {
    name: 'Header',
    data() {
        return {
            login: null,
        };
    },
    // ... other component options
    computed: {
        userLink() {
            const userStore = UserStore();
            this.login = userStore.isLoggedIn;
            return this.login ? "/profile" : "/login";
        },
    }
};
</script>

<style scoped>
.admin-header {
    background-color: #f8f9fa; /* Màu nền */
}

.logo h1 {
    font-size: 2rem;
    color: #333; /* Màu logo */
}

.icon-bar {
    margin-top: 15px;
    gap: 20px;
}

.icon-item {
    cursor: pointer;
}

.icon-item i {
    font-size: 1.5rem; /* Kích thước icon */
    color: #000; /* Màu icon */
}

.icon-item:hover i {
    color: #007bff; /* Màu khi hover */
}

.icon-text {
    display: block;
    margin-top: 5px;
    font-size: 0.9rem; /* Kích thước text */
    color: #666; /* Màu text */
}

.icon-item:hover .icon-text {
    color: #007bff; /* Màu text khi hover */
}

@media (max-width: 768px) {
    .admin-header {
        text-align: center;
    }
}
</style>
