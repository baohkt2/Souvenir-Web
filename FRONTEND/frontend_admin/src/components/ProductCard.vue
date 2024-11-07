<template>
  <div class="card product-card">
    <img :src="product.image" class="card-img-top product-image" @click="navigateToProductDetail" alt="Product image" />
    <div class="card-body text-center">
      <h5 class="card-title">{{ product.name }}</h5>
    </div>
    <div class="card-footer bg-transparent">
      <small class="text-muted">Giá: {{ product.price }}</small><br>
      <small class="text-muted">Số lượng: {{ product.countInStock}}</small>
    </div>
    <div class="card-footer bg-transparent d-flex justify-content-between">
      <button class="btn btn-primary btn-sm" @click.stop="editProduct">Sửa</button>
      <button class="btn btn-danger btn-sm" @click.stop="deleteProduct">Xóa</button>
    </div>
  </div>
</template>
  
<script>

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    editProduct() {
      this.$emit('edit', this.product);
    },
    deleteProduct() {
      this.$emit('delete', this.product);
    },
    navigateToProductDetail() {
      this.$router.push({ name: 'ProductDetail', params: { id: this.product._id } });
    }
  }
};
</script>
  
  
<style scoped>
.product-card {
  cursor: pointer;
  margin: 10px;
  transition: transform 0.3s ease-in-out;
}

.product-card:hover {
  transform: scale(1.03);
}

.product-card .product-image {
  height: 200px;
  object-fit: cover;
}



.card-footer {
  text-align: center;
}
</style>
  