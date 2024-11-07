<template>
    <div class="container product-detail mt-4 bg-white rounded-5 p-5" v-if="product">
        <div class="row">
            <div class="col-md-6">
                <img :src="product.image" alt="Product image" class="img-fluid product-image" />
            </div>
            <div class="col-md-6 product-info">
                <h2>{{ product.name }}</h2>
                <p class="brand">Brand: {{ product.brand }}</p>
                <p class="price">{{ product.price }}đ</p>
                <p class="in-stock" v-if="product.inStock">Còn hàng</p>
                <p class="out-of-stock" v-else>Hết hàng</p>
                <p class="description">{{ product.description }}</p>
                <div class="rating">
                    Đánh giá: {{ product.rating }} stars ({{ product.numReviews }} reviews)
                </div>
                <div class="quantity-selector my-3">
                    <button @click="decreaseQuantity" class="btn btn-outline-secondary">-</button>
                    <input type="text" v-model="quantity" class="form-control mx-2" style="width: 60px;">
                    <button @click="increaseQuantity" class="btn btn-outline-secondary">+</button>
                </div>
                <button @click="addToCart(product)" class="btn btn-primary add-to-cart-btn">Thêm vào giỏ hàng</button>
            </div>
        </div>
        <!-- Phần xem và đánh giá sản phẩm ở đây -->
    </div>
    <div v-else>
        <p>Đang tải thông tin sản phẩm...</p>
    </div>
</template>

<script>
import { CartStore } from '@/stores/cartStore';
import ProductServices from '@/services/product.service';

export default {
    name: 'ProductDetail',
    data() {
        return {
            product: null,
            quantity: 1
        };
    },
    async mounted() {
        try {
            const _idProduct = this.$route.params.id;
            this.product = await ProductServices.get(_idProduct);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        }
    },
    methods: {
        addToCart() {
            const cartStore = CartStore();
            cartStore.addProduct(this.product);
            cartStore.updateQuantity(this.product._id, this.quantity);
            alert(`${this.product.name} đã được thêm vào giỏ hàng với số lượng ${this.quantity}.`);
        }
        ,
        increaseQuantity() {
            if (this.quantity < this.product.countInStock) {
                this.quantity++;
            } else {
                alert(`Chỉ có tối đa ${this.product.countInStock} sản phẩm trong kho.`);
            }
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            } else {
                alert('Số lượng không thể nhỏ hơn 1.');
            }
        }
    }

};
</script>

<style scoped>
.product-detail .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

.product-info {
    display: flex;
    flex-direction: column;
}

.add-to-cart-btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-top: 15px;
    transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
    background-color: #0056b3;
}

.quantity-selector {
    display: flex;
    align-items: center;
}

/* Thêm các styles khác tùy theo nhu cầu thiết kế */
</style>
