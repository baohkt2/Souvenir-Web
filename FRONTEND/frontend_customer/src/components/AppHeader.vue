<template>
    <header class="container-md">
        <AppHeader_Decor v-if="showDecor" />
        <!-- Thêm phần này vào sau phần header của bạn -->
        <div class="snowflakes" aria-hidden="true">
            <i class="snowflake fas fa-snowflake"></i>
            <!-- Thêm nhiều snowflakes tùy ý -->
        </div>

        <div class="container text-center">
            <div class="row">
                <div class="col-4">
                    <img class="tree" src="../assets/images/header/tree.png" alt="">
                </div>
                <div class="header-logo col-6">
                    <div class="row">
                        <h1 class="col-8">
                            Memories
                        </h1>
                    </div>
                </div>
                <div class="col d-flex justify-content-end align-items-center icon-bar">
                    <div class="icon-item">
                        <router-link :to="userLink">
                            <i class="fa-solid fa-user"></i>
                            <span class="icon-text">Tài khoản</span> </router-link>
                    </div>
                    <div class="icon-item">
                        <router-link to="/cart"> <i class="fa-solid fa-cart-shopping"></i>
                            <span class="icon-text">Giỏ hàng</span></router-link>
                    </div>
                    <div class="icon-item">
                        <router-link to="/order" v-if="login">
                            <i class="fa-solid fa-file-invoice"></i>
                            <span class="icon-text">Đơn hàng</span>
                        </router-link>
                    </div>
                    <div class="icon-item">
                        <router-link to="/logout" v-if="login"> <i class="fa-solid fa-right-from-bracket"></i>
                            <span class="icon-text">Đăng xuất</span></router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- MENU -->
        <nav class="navbar navbar-expand-lg nav-font">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Trang Chủ</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Danh mục
                            </a>
                            <ul class="dropdown-menu">
                                <li v-for="category in categories" :key="category.name">
                                    <router-link class="dropdown-item" :to="`/products?category=${category.slug}`">{{
                                        category.name }}</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/about">Giới Thiệu</router-link>
                        </li>
                    </ul>
                    <form class="d-flex" role="search" @submit.prevent="performSearch">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            v-model="searchTerm">
                        <button class="btn btn-outline-warning" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    </header>
</template>


<script>
import AppHeader_Decor from "@/components/AppHeader_Decor.vue";
import { UserStore } from "@/stores/userStore";
export default {
    name: 'AppHeader',
    components: {
        AppHeader_Decor
    },
    data() {
        return {
            showDecor: true, // Mặc định hiển thị
            categories: [
                { name: 'Gấu Bông', slug: 'Gấu Bông' },
                { name: 'Quà Valentine', slug: 'Quà Valentine' },
                { name: 'Vòng Tay', slug: 'Vòng Tay' },
                { name: 'Nến thơm', slug: 'Nến Thơm' },
                { name: 'Thiệp', slug: 'Thiệp' },
                { name: 'Quà giáng sinh', slug: 'Quà giáng sinh' },
                { name: 'Tất cả', slug: '' },
            ],
            login: null,
            searchTerm: '',
        };
    },
    computed: {
        userLink() {
            const userStore = UserStore();
            this.login = userStore.isLoggedIn;
            return this.login ? "/profile" : "/login";
        },
    }
    ,
    mounted() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        performSearch() {
            this.$router.push({ name: 'Products', query: { search: this.searchTerm } });
        },
        handleResize() {
            this.showDecor = window.innerWidth >= 768;
        }
    }
    // ... phần còn lại của component
}
</script>


<style scoped>
.tree {
    max-height: 100px;
}

/* CSS mặc định cho router-link */
router-link {
    text-decoration: none;
    /* Loại bỏ gạch chân mặc định */
    color: #333;
    /* Màu chữ mặc định */
}

/* CSS hover cho router-link */
router-link:hover {
    color: #ff6600;
    /* Màu chữ khi hover */
    /* Thêm các hiệu ứng khác tùy ý */
}

.icon-bar {
    gap: 15px;
}

.icon-item {
    position: relative;
    cursor: pointer;
}

.icon-item i {
    font-size: 2vw;
    /* Kích thước của icon */
    color: #000000;
    /* Màu sắc của icon */
}

.icon-item:hover i {
    color: #ff6600;
    /* Màu khi hover */
}

.icon-text {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
}

.icon-item:hover .icon-text {
    visibility: visible;
    opacity: 1;
}
</style>
