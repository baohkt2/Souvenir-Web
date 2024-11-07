<template>
    <div class="container my-4">
        <h2>Đơn hàng của bạn</h2>
        <div v-if="orders.length">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID đơn hàng</th>
                        <th>Ngày đặt hàng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order._id">
                        <td>{{ order._id }}</td>
                        <td>{{ new Date(order.createdAt).toLocaleDateString() }}</td>
                        <td>${{ order.totalPrice }}</td>
                        <td :class="{'text-success': order.isPaid, 'text-danger': !order.isPaid}">
                            {{ order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán' }}
                        </td>
                        <td>
                            <router-link :to="`/order/${order._id}`" class="btn btn-primary btn-sm">Xem chi tiết</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p>Không có đơn hàng nào.</p>
        </div>
    </div>
</template>

<script>
import OrderService from "@/services/order.service";

export default {
    name: 'Order',
    data() {
        return {
            orders: []
        };
    },
    async mounted() {
        try {
            this.orders = await OrderService.getAllOrder();
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }
};
</script>
