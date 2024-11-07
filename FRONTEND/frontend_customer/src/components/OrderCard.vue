<template>
    <div class="card order-card">
        <div class="card-body">
            <h5 class="card-title">Order #{{ order._id }}</h5>
            <p class="card-text">Total Price: ${{ order.totalPrice }}</p>
            <p class="card-text" :class="{ 'text-success': order.isPaid, 'text-danger': !order.isPaid }">
                Status: {{ order.isPaid ? 'Paid' : 'Not Paid' }}
            </p>
            <!-- Thêm các thông tin khác nếu cần -->
            <button class="btn btn-primary" @click="viewOrderDetails">View Details</button>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'OrderCard',
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    methods: {
        viewOrderDetails() {
            // Logic để xem chi tiết đơn hàng
            // Có thể emit event hoặc sử dụng router để điều hướng
        }
    }
};
</script>
  
<style scoped>
.order-card {
    margin-bottom: 20px;
}

/* Thêm các styles tùy chỉnh khác */
</style>
  