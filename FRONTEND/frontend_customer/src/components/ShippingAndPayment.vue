<template>
    <div class="shipping-payment-info">
        <h3>Thông Tin Giao Hàng</h3>
        <form @submit.prevent="submitOrder">
            <div class="mb-3">
                <label for="address" class="form-label">Địa chỉ</label>
                <input type="text" class="form-control" id="address" v-model="shippingAddress.address" required>
            </div>
            <div class="mb-3">
                <label for="city" class="form-label">Thành phố</label>
                <input type="text" class="form-control" id="city" v-model="shippingAddress.city" required>
            </div>
            <div class="mb-3">
                <label for="postalCode" class="form-label">Mã bưu điện</label>
                <input type="text" class="form-control" id="postalCode" v-model="shippingAddress.postalCode" required>
            </div>
            <div class="mb-3">
                <label for="country" class="form-label">Quốc gia</label>
                <input type="text" class="form-control" id="country" v-model="shippingAddress.country" required>
            </div>

            <h3>Phương Thức Thanh Toán</h3>
            <select class="form-select mb-3" v-model="paymentMethod">
                <option value="creditCard">Thẻ Tín Dụng</option>
                <option value="paypal">PayPal</option>
                <option value="cod">Thanh toán khi nhận hàng</option>
            </select>

            <button type="submit" class="btn btn-primary">Xác Nhận Thông Tin</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ShippingAndPayment',
    data() {
        return {
            shippingAddress: {
                address: '',
                city: '',
                postalCode: '',
                country: ''
            },
            paymentMethod: ''
        };
    },
    methods: {
        submitOrder() {
            // Gửi thông tin giao hàng và thanh toán tới Cart.vue
            this.$emit('submit-order', {
                shippingAddress: this.shippingAddress,
                paymentMethod: this.paymentMethod
            });
        }
    }
};
</script>

<style>
.shipping-payment-info {
    padding: 20px;
    border-radius: 5px;
    background-color: #f8f9fa;
    margin-top: 20px;
}

/* Thêm các styles khác nếu cần */
</style>
