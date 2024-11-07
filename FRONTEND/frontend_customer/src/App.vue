<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <div id="app" class="bg">
    <AppHeader />
    <div class="container">
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.bg {
  background-image: url('@/assets/images/header/background.jpg');
  /* Đường dẫn đến hình nền */
  background-size: cover;
  background-position: center;
  /* Đảm bảo nó nằm dưới class header */
}
</style>