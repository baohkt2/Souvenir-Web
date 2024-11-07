
<script>
import OrderService from "@/services/order.service";

export default {
    name: 'OrderDetail',
    data() {
        return {
            order: null
        };
    },
    async mounted() {
        try {
            const orderId = this.$route.params.id;
            this.order = await OrderService.getOrder(orderId);
        } catch (error) {
            console.error('Error fetching order detail:', error);
        }
    }
};
</script>

<template>
    <div class="container my-4" v-if="order">
        <h2 class="text-primary mb-4">Chi tiết đơn hàng #{{ order._id }}</h2>
        <div class="card mb-3 shadow">
            <div class="card-body">
                <h5 class="card-title text-secondary">Thông tin đơn hàng</h5>
                <p><strong>Ngày đặt hàng:</strong> {{ new Date(order.createdAt).toLocaleDateString() }}</p>
                <p :class="{'text-success': order.isPaid, 'text-danger': !order.isPaid}">
                    <strong>Trạng thái thanh toán:</strong> {{ order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán' }}
                </p>
                <p :class="{'text-success': order.isDelivered, 'text-danger': !order.isDelivered}">
                    <strong>Trạng thái giao hàng:</strong> {{ order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng' }}
                </p>
            </div>
        </div>

        <div class="card mb-3 shadow">
            <div class="card-body">
                <h5 class="card-title text-secondary">Sản phẩm</h5>
                <ul class="list-group">
                    <li v-for="item in order.orderItems" :key="item.product" class="list-group-item">
                        {{ item.name }} - {{ item.qty }} x ${{ item.price }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="card shadow">
            <div class="card-body">
                <h5 class="card-title text-secondary">Thông tin giao hàng</h5>
                <p>{{ order.shippingAddress.address }}, {{ order.shippingAddress.city }}, {{ order.shippingAddress.postalCode }}, {{ order.shippingAddress.country }}</p>
                <p><strong>Phương thức thanh toán:</strong> {{ order.paymentMethod }}</p>
                <p class="text-info"><strong>Tổng cộng:</strong> ${{ order.totalPrice }}</p>
            </div>
        </div>
    </div>
    <div v-else class="text-center">
        <p>Đang tải thông tin đơn hàng...</p>
    </div>
</template>

<style>
.list-group-item {
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.list-group-item:hover {
    background-color: #f8f9fa;
}

.text-primary {
    color: #007bff;
}

.text-secondary {
    color: #6c757d;
}

.text-success {
    color: #28a745;
}

.text-danger {
    color: #dc3545;
}

.text-info {
    color: #17a2b8;
}

.shadow {
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
</style>
