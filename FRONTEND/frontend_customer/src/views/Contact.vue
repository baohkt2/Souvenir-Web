<template>
    <div class="container my-5">
        <h1 class="text-center mb-5">Liên Hệ Chúng Tôi</h1>
        <div class="row">
            <div class="col-lg-7 mb-4">
                <div class="card shadow-sm p-4">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="name" class="form-label">Tên</label>
                            <input type="text" class="form-control" id="name" v-model="contact.name"
                                placeholder="Nhập tên của bạn" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" v-model="contact.email"
                                placeholder="Nhập email của bạn" required>
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Tin Nhắn</label>
                            <textarea class="form-control" id="message" v-model="contact.message" rows="5"
                                placeholder="Nhập tin nhắn của bạn" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Gửi</button>
                    </form>
                </div>
            </div>
            <div class="col-lg-5 mb-4">
                <!-- Thêm thông tin liên hệ hoặc bản đồ ở đây -->
                <div class="card shadow-sm p-4">
                    <h5>Địa chỉ của chúng tôi</h5>
                    <p>123 Đường XYZ, Thành phố ABC, Quốc gia DEF</p>
                    <!-- Thêm thông tin liên hệ khác và/hoặc bản đồ -->
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Contact',
    data() {
        return {
            contact: {
                name: '',
                email: '',
                message: ''
            }
        };
    },
    methods: {
        submitForm() {
            console.log('Form submitted:', this.contact);
        }
    }
};
</script>
  
<style scoped>/* Thêm các style cần thiết nếu muốn */</style>
  