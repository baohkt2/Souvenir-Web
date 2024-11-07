<template>
    <div class="container my-4" v-if="product">
        <h2>Chi Tiết Sản Phẩm</h2>
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">{{ product.name }}</h3>
                <p class="card-text"><strong>Giá:</strong> {{ product.price }}</p>
                <p class="card-text"><strong>Mô tả:</strong> {{ product.description }}</p>
                <p class="card-text"><strong>Thương hiệu:</strong> {{ product.brand }}</p>
                <p class="card-text"><strong>Số lượng trong kho:</strong> {{ product.countInStock }}</p>
            </div>
        </div>
    </div>
    <div v-else class="text-center">
        <p>Đang tải thông tin sản phẩm...</p>
    </div>
</template>

<script>
import ProductService from "@/services/product.service";

export default {
    name: 'ProductDetail',
    data() {
        return {
            product: null
        };
    },
    async mounted() {
        try {
            const productId = this.$route.params.id; // Lấy ID từ router params
            this.product = await ProductService.getProductByID(productId); // Gọi API lấy thông tin sản phẩm
        } catch (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        }
    }
};
</script>
