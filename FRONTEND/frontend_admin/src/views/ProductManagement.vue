<template>
    <div class="container">
      
        <router-link class="btn btn-primary" to="/product">Thêm Sản Phẩm</router-link>
        <div class="search-filter mb-3">
            <input type="text" class="form-control" placeholder="Tìm kiếm sản phẩm..." v-model="searchTerm"
                @input="fetchProducts">
           
        </div>

        <div class="products">
            <product-card v-for="product in products" :key="product._id" :product="product" @edit="handleEdit"
                @delete="handleDelete" />
        </div>

      
        <div class="pagination">
            <!-- Nút Previous -->
            <button v-if="page > 1" @click="fetchProducts(page - 1)">Previous</button>
            <!-- Các nút số trang -->
            <button v-for="pageNum in total_pages" :key="pageNum" @click="fetchProducts(pageNum)"
                :class="{ 'active-page': pageNum === page }">
                {{ pageNum }}
            </button>
            <!-- Nút Next -->
            <button v-if="page < total_pages" @click="fetchProducts(page + 1)">Next</button>
        </div>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import ProductService from '@/services/product.service';

export default {
    name: 'ProductManagement',
    components: {
        ProductCard
    },
    data() {
        return {
            products: [],
            page: 1,
            total_pages: 0,
            searchTerm: ''
        };
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
                console.log(params);
                let response = await ProductService.getAll(params);
                

                if (response) {
                    this.products = response.products;
                    this.total_pages = response.totalPages;
                    this.page = response.page;
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        handleEdit(product) {
            this.$router.push({ name: 'ProductEdit', params: { id: product._id } });
        }
        ,
        handleDelete(product) {
            // Xác nhận trước khi xóa
            if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${product.name}?`)) {
                ProductService.delete(product._id)
                    .then(() => {
                        alert('Sản phẩm đã được xóa.');
                        this.fetchProducts(this.page); // Tải lại danh sách sản phẩm
                    })
                    .catch(error => {
                        console.error('Error deleting product:', error);
                        alert('Có lỗi xảy ra khi xóa sản phẩm.');
                    });
            }
        },
        showProductDetail(productId) {
            this.$router.push({ name: 'ProductDetail', params: { id: productId } });
        }
    },
    mounted() {
        this.fetchProducts();
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

.active-page {
    font-weight: bold;
    color: blue;
}
</style>
