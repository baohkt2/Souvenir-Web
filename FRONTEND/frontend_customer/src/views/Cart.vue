<template>
    <div class="container my-5 rouded-5">
        <h2 class="mb-4">Giỏ hàng của bạn</h2>
        <div class="row" v-if="cartProducts.length">
            <div class="col-lg-8">
                <table class="table table-hover">
                    <tbody>
                        <tr v-for="product in cartProducts" :key="product._id" class="rouded-5">
                            <td>
                                <img :src="product.image" alt="product.name" class="img-fluid product-image-lg" />
                                {{ product.name }}
                            </td>
                            <td>
                                <input type="number" class="form-control" v-model="product.quantity" min="1"
                                    @change="updateCart(product._id, product.quantity)">
                            </td>
                            <td>${{ product.price }}</td>
                            <td>
                                <button class="btn btn-danger" @click="removeFromCart(product._id)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4">
                <div class="card summary-card">
                    <h3 class="card-title p-3">Tổng kết giỏ hàng</h3>
                    <p class="card-text ps-3">Tổng số lượng: {{ totalQuantity }}</p>
                    <p class="card-text ps-3">Tổng giá: {{ totalPrice }}</p>
                    <p class="card-text ps-3">Giảm giá: {{ discount }}</p>
                    <p class="card-text total p-3"><strong>Tổng cộng:</strong> {{ totalAfterDiscount }} đ</p>
                    <div class="card-footer">
                        <button class="btn btn-lg btn-success" @click="show">Tiến hành thanh toán</button>
                    </div>
                </div>
            </div>
            <shipping-and-payment v-if="showShippingPayment" @submit-order="handleOrderSubmission"></shipping-and-payment>
        </div>
        <div v-else class="text-center py-5">
            <p class="lead">Giỏ hàng của bạn đang trống.</p>
            <router-link to="/products" class="btn btn-primary">Tiếp tục mua sắm</router-link>
        </div>
    </div>
</template>

<script>
import { CartStore } from '@/stores/cartStore';
import OrderService from "@/services/order.service";
import ShippingAndPayment from '@/components/ShippingAndPayment.vue';
import { UserStore } from '@/stores/userStore';

export default {
    name: 'Cart',
    components: { ShippingAndPayment },
    data() {
        return {
            showShippingPayment: false
        };
    },
    computed: {
        cartProducts() {
            const cartStore = CartStore();
            return cartStore.products;
        },
        totalQuantity() {
            const cartStore = CartStore();
            return cartStore.totalQuantity;
        },
        totalPrice() {
            const cartStore = CartStore();
            return cartStore.totalPrice;
        },
        discount() {
            return this.totalPrice * 0.05;
        },
        totalAfterDiscount() {
            return this.totalPrice - this.discount;
        }

    },
    methods: {
        show() {
            const userStore = UserStore();
            if (!userStore.isLoggedIn) {
                // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
                this.$router.push({ name: 'Login' });
            } else {
                // Nếu người dùng đã đăng nhập, hiển thị phần thanh toán
                this.showShippingPayment = true;
            }
        },

        handleOrderSubmission(orderDetails) {
            // Xử lý thông tin giao hàng và thanh toán nhận được từ ShippingAndPayment
            console.log("Received Order Details:", orderDetails);
            // Bây giờ bạn có thể sử dụng thông tin này để tạo một đơn hàng mới
            this.createOrder(orderDetails);
        },
        removeFromCart(productId) {
            const cartStore = CartStore();
            cartStore.removeProduct(productId);
        },
        updateCart(productId, newQuantity) {
            const cartStore = CartStore();
            if (newQuantity < 1) {
                alert('Số lượng phải lớn hơn hoặc bằng 1');
                return;
            }
            cartStore.updateQuantity(productId, newQuantity);
            // Tự động cập nhật tổng số lượng và tổng giá khi số lượng thay đổi
        }
        ,
        async createOrder(orderDetails) {
            const cartStore = CartStore();
            const orderItems = cartStore.products.map(product => ({
                name: product.name,
                qty: product.quantity,
                image: product.image,
                price: product.price,
                product: product._id // Đảm bảo rằng product.id là ID hợp lệ của sản phẩm
            }));
            const newOrder = {
                orderItems: orderItems,
                shippingAddress: orderDetails.shippingAddress,
                paymentMethod: orderDetails.paymentMethod,
                // Các thông tin khác như totalPrice, itemsPrice, v.v.
                totalPrice: cartStore.totalPrice,
            };

            // Gửi đơn hàng đến server
            try {
                const createdOrder = await OrderService.createOrder(newOrder);
                console.log('Order created:', createdOrder);
                // Chuyển hướng người dùng đến trang chi tiết đơn hàng
                // Sử dụng ID của đơn hàng trong URL
                cartStore.products = null;
                this.$router.push({ name: 'OrderDetail', params: { id: createdOrder._id } });
            } catch (error) {
                console.error('Error creating order:', error);
                // Xử lý lỗi tại đây
            }

        }

    }
};
</script>

<style>
.product-image-lg {
    max-width: 80px;
    /* Tăng kích thước ảnh */
    max-height: 80px;
    object-fit: cover;
    margin-right: 15px;
}

.card-text,
.card-title {
    font-size: larger;
}

.total {
    font-size: larger;
    font-weight: bold;
}
</style>


