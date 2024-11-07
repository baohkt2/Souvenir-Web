<template>
    <main>
        <div class="container mt-4">

            <div class="row" v-for="(rowCards, index) in chunkedAdminCards" :key="index">

                <div class="col-md-6 mb-4" v-for="card in rowCards" :key="card.title">
                    <div class="card text-center admin-card" @click="navigateTo(card.path)">
                        <div class="card-body">
                            <img :src="card.img" alt="" class="card-img-top">
                            <h5 class="card-title">{{ card.title }}</h5>
                            <p class="card-text">{{ card.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            adminCards: [
                { title: 'Quản Lý Người Dùng', text: 'Quản lý thông tin và quyền người dùng', img: 'src/assets/images/header/quan-ly-user-cpanel.png', path: '/UserManagement' },
                { title: 'Quản Lý Đơn Hàng', text: 'Theo dõi và xử lý các đơn hàng', img: 'src/assets/images/header/quan-ly-user-cpanel.png', path: '/OrderManagement' },
                { title: 'Quản Lý Sản Phẩm', text: 'Cập nhật và quản lý sản phẩm', img: 'src/assets/images/header/qua16270313596228.jpg', path: '/ProductManagement' },
            ]
        };
    },
    computed: {
        chunkedAdminCards() {

            let result = [];
            for (let i = 0; i < this.adminCards.length; i += 2) {
                result.push(this.adminCards.slice(i, i + 2));
            }
            return result;
        },
    },
    methods: {
        navigateTo(path) {
            this.$router.push({ path: path });
        }
    }

}
</script>

<style scoped>
.admin-card {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    cursor: pointer;
    border: none;
    height: 100%;
    /* Make cards of equal height */
}

.admin-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.admin-card .card-body {
    padding: 1.5rem;
}

.card-img-top {
    width: 50%;
    /* Adjust image size */
    margin: 0 auto;
    /* Center the image */
}

.card-title {
    font-size: 1.25rem;
    color: #007bff;
}

.card-text {
    color: #6c757d;
}
</style>
