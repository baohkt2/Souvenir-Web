<template>
    <div class="container mt-4">
        <h2 class="mb-4">Quản Lý Đơn Hàng</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên Khách Hàng</th>
                    <th scope="col">Tổng Giá Trị</th>
                    <th scope="col">Trạng Thái Thanh Toán</th>
                    <th scope="col">Trạng Thái Giao Hàng</th>
                    <th scope="col">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in orders" :key="order._id" @click="selectOrder(order._id)">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ order.user.name }}</td>
                    <td>{{ order.totalPrice | currency }}</td>
                    <td>
                        <span v-if="order.isPaid">Đã Thanh Toán</span>
                        <button v-else class="btn btn-warning btn-sm" @click="updatePaymentStatus(order._id)">Thanh
                            Toán</button>
                    </td>
                    <td>
                        <span v-if="order.isDelivered">Đã Giao Hàng</span>
                        <button v-else class="btn btn-success btn-sm" @click="updateDeliveryStatus(order._id)">Giao
                            Hàng</button>
                    </td>
                    <td>
                        <button class="btn btn-info btn-sm" @click="showOrderDetail(order)">Xem Chi Tiết</button>
                        <button class="btn btn-danger btn-sm" @click="deleteOrder(order._id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <OrderDetail v-if="selectedOrder" :order="selectedOrder" />
    </div>
</template>

<script>
import OrderService from '@/services/order.service';
import OrderDetail from '@/components/OrderDetail.vue';

export default {
    name: 'OrderManagement',
    components: {
        OrderDetail
    },
    data() {
        return {
            orders: [],
            selectedOrder: null,
        };
    },
    methods: {
        async fetchOrders() {
            try {
                this.orders = await OrderService.getAllOrder();
            } catch (error) {
                console.error('Error fetching orders:', error);
                // Xử lý lỗi tại đây
            }
        },
        async updatePaymentStatus(orderId) {
            try {
                await OrderService.isPaid(orderId);
                this.fetchOrders(); // Cập nhật lại danh sách đơn hàng sau khi thay đổi trạng thái
            } catch (error) {
                console.error('Error updating payment status:', error);      
            }
        },
        async updateDeliveryStatus(orderId) {
            try {
                await OrderService.isdelivered(orderId);
                this.fetchOrders(); // Cập nhật lại danh sách đơn hàng sau khi thay đổi trạng thái
            } catch (error) {
                console.error('Error updating delivery status:', error);
            }
        },
        async deleteOrder(orderId) {
            try {
                await OrderService.deleteOrder(orderId);
                this.fetchOrders(); // Cập nhật lại danh sách đơn hàng sau khi xóa
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        },
        showOrderDetail(order) {
            // Thiết lập ID đơn hàng được chọn
            this.selectedOrder = order;
        },
    },
    mounted() {
        this.fetchOrders();
    }
};
</script>


