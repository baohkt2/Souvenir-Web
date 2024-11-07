<template>
    <div class="container mt-5 blur pb-5 rounded-5">
        <div class="row justify-content-center">
            <div class="col-md-6 text-center">
                <h1 class="display-1 font-weight-bold">404</h1>
                <p class="lead">Oops! Chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.</p>
                <router-link to="/" class="btn btn-primary">Quay lại trang chủ</router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'NotFound'
};
</script>
  
<style scoped>
h1 {
    font-size: 80px;
}

.blur {
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lead {
    font-size: 1.5rem;
    margin-bottom: 20px;
}
</style>
  