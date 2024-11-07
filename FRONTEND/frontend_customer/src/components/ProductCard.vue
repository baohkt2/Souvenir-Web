<template>
    <div class="card product-card">
      <img :src="product.image" class="card-img-top product-image" @click="navigateToProductDetail" alt="Product image"/>
      <div class="card-body text-center">
        <h5 class="card-title">{{ product.name }}</h5>
        <button @click="addToCart(product)" class="btn btn-success add-to-cart-btn">Thêm vào giỏ hàng</button>
      </div>
      <div class="card-footer bg-transparent">
        <small class="text-muted">Giá: ${{ product.price }}</small>
      </div>
    </div>
  </template>
  
  <script>
  import { CartStore } from '@/stores/cartStore';
  
  export default {
    name: 'ProductCard',
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    methods: {
      addToCart(product) {
        const cartStore = CartStore();
        cartStore.addProduct(product);
        console.log('Added to cart:', product.name);
        // Thêm logic hiệu ứng khi thêm sản phẩm vào giỏ hàng
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
  
  .add-to-cart-btn {
    margin-top: 10px;
  }
  
  .card-footer {
    text-align: center;
  }
  </style>
  