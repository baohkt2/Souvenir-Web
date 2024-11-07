<template>
    <div class="contact-detail">
        <h3>Chi Tiết Liên Hệ</h3>
        <!-- Hiển thị các thông tin chi tiết của liên hệ -->
    </div>
</template>

<script>
export default {
    props: {
        contactId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            contact: null,
        };
    },
    methods: {
        fetchContactDetail() {
            // Gọi API để lấy thông tin chi tiết liên hệ
        }
    },
    watch: {
        contactId(newVal) {
            if (newVal) {
                this.fetchContactDetail();
            }
        }
    },
    mounted() {
        this.fetchContactDetail();
    }
};
</script>

<style scoped>
/* Thêm các styles tùy chỉnh nếu cần */
</style>
