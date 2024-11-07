<template>
    <div class="container">
        <div class="products">
            <product-card v-for="product in products" :key="product._id" :product="product" />
        </div>
        <div class="pagination">
            <button v-if="page > 1" @click="fetchProducts(page - 1)">Previous</button>
            <span>Page {{ page }} of {{ total_pages }}</span>
            <button v-if="page < total_pages" @click="fetchProducts(page + 1)">Next</button>
        </div>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import ProductService from '@/services/product.service';

export default {
    name: 'Product',
    components: {
        ProductCard
    },
    data() {
        return {
            products: [],
            page: 1,
            total_pages: 0
        };
    },
    computed: {
        selectedCategory() {
            return this.$route.query.category;
        },
        searchTerm() {
            return this.$route.query.search; // Lấy từ khóa tìm kiếm từ URL query
        }
    },
    watch: {
        '$route.query': {
            // Phản ứng khi query params thay đổi
            handler() {
                this.fetchProducts(1);
            },
            immediate: true, // Gọi handler ngay khi component được tạo
        }
    },
    methods: {
        async fetchProducts(page = 1) {
            try {
                const params = {
                    page: page,
                    limit: 10,
                    category: this.selectedCategory,
                    search: this.searchTerm
                };

                let response = await ProductService.getAll(params);

                if (response) {
                    this.products = response.products;
                    this.total_pages = response.totalPages;
                    this.page = response.page;
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
    }
};
</script>

<style scoped>
.products {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.pagination button {
    margin: 0 10px;
}
</style>
