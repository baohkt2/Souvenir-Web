<template>
    <div v-if="order" class="order-detail">
        <h3>Order Details for Order #{{ order._id }}</h3>
        <div v-for="item in order.orderItems" :key="item.product">
            <img :src="item.image" alt="Product image" class="product-image" />
            {{ item.name }} - Qty: {{ item.qty }} - Price: ${{ item.price }}
        </div>
        <!-- Thêm các thông tin khác về đơn hàng -->
    </div>
</template>
  
<script>
export default {
    name: 'OrderDetail',
    props: {
        order: {
            type: Object,
            required: false,
            default: () => ({})
        }
    },
    // Phần logic khác
};
</script>
  
<style scoped>
.product-image {
    width: 50px;
    /* Adjust as needed */
    height: 50px;
    /* Adjust as needed */
}
</style>
  