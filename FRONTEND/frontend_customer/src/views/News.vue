<template>
    <div class="container my-4">
      <h1 class="text-center mb-4">Tin Tức Mới Nhất</h1>
      <div class="row">
        <div class="col-md-4 mb-3" v-for="newsItem in news" :key="newsItem.id">
          <div class="card h-100">
            <img class="card-img-top" :src="newsItem.image" alt="News Image">
            <div class="card-body">
              <h5 class="card-title">{{ newsItem.title }}</h5>
              <p class="card-text">{{ newsItem.summary }}</p>
              <router-link :to="`/news/${newsItem.id}`" class="btn btn-primary">Đọc thêm</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'News',
    data() {
      return {
        // Dữ liệu giả định
        news: [
          { id: 1, title: 'Tiêu đề Tin Tức 1', summary: 'Tóm tắt Tin Tức 1', image: 'path-to-image-1.jpg' },
          { id: 2, title: 'Tiêu đề Tin Tức 2', summary: 'Tóm tắt Tin Tức 2', image: 'path-to-image-2.jpg' },
          // thêm các tin tức khác
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  </style>
  