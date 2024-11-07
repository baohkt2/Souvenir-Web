<template>
    <footer class="footer bg-light mt-5">
        <div class="container text-center py-3">
            <h2>Memories Admin</h2>
            <div class="social-icons">
                <a href="#" class="icon me-3"><i class="fa-brands fa-facebook"></i></a>
                <a href="#" class="icon me-3"><i class="fa-brands fa-instagram"></i></a>
                <a href="#" class="icon"><i class="fa-brands fa-twitter"></i></a>
            </div>
            <p class="mt-3">&copy; 2023 Memories. All rights reserved.</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    // Các phương thức, dữ liệu, tính toán, v.v. khác (nếu cần)
}
</script>

<style scoped>
.footer {
    background-color: #f8f9fa; /* Màu nền cho footer */
}

.footer h2 {
    font-size: 24px;
    color: #333; /* Màu chữ */
}

.social-icons .icon {
    color: #555; /* Màu icon */
    font-size: 24px;
}

.social-icons .icon:hover {
    color: #007bff; /* Màu khi hover */
}

@media (max-width: 768px) {
    .footer {
        text-align: center;
    }
}
</style>
