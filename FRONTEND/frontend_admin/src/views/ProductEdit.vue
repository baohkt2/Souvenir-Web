<template>
    <div class="container my-4">
        <h2>{{ isEditMode ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới' }}</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="productName" class="form-label">Tên Sản Phẩm</label>
                <input type="text" class="form-control" id="productName" v-model="product.name">
            </div>
            <div class="mb-3">
                <label for="productBrand" class="form-label">Thương Hiệu</label>
                <input type="text" class="form-control" id="productBrand" v-model="product.brand">
            </div>
            <div class="mb-3">
                <label for="productCategory" class="form-label">Phân Loại</label>
                <select class="form-control" id="productCategory" v-model="product.category">
                    <option v-for="category in categories" :key="category.name" :value="category.name">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label for="productPrice" class="form-label">Giá</label>
                <input type="number" class="form-control" id="productPrice" v-model.number="product.price">
            </div>
            <div class="mb-3">
                <label for="productQuantity" class="form-label">Số Lượng</label>
                <input type="number" class="form-control" id="productQuantity" v-model.number="product.countInStock">
            </div>
            <div class="mb-3">
                <label for="productDescription" class="form-label">Mô Tả</label>
                <textarea class="form-control" id="productDescription" v-model="product.description"></textarea>
            </div>
            <div class="mb-3">
                <label for="productImage" class="form-label">Hình Ảnh</label>
                <input type="text" class="form-control" id="productImage" v-model="product.image">
            </div>
            <button type="submit" class="btn btn-primary">
                {{ isEditMode ? 'Cập Nhật' : 'Thêm Sản Phẩm' }}
            </button>
        </form>
    </div>
</template>
  

<script>
import ProductService from '@/services/product.service';

export default {
    name: 'ProductEdit',
    data() {
        return {
            product: {
                name: '',
                brand: '',
                category: '',
                price: 0,
                countInStock: 0,
                description: '',
                image: ''
            },
            isEditMode: false,
            categories: [
                { name: 'Gấu Bông' },
                { name: 'Quà Valentine' },
                { name: 'Vòng Tay' },
                { name: 'Nến thơm' },
                { name: 'Thiệp' },
                { name: 'Quà giáng sinh' },
            ],
        };
    },
    created() {
        if (this.$route.params.id) {
            this.fetchProductDetails();
            this.isEditMode = true;
        }
    },
    methods: {
        fetchProductDetails() {
            const productId = this.$route.params.id;
            ProductService.get(productId)
                .then(response => {
                    this.product = response;
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                });
        },
        async submitForm() {
            try {
                let message = '';
                if (this.isEditMode) {
                    await ProductService.update(this.$route.params.id, this.product);
                    message = 'Sản phẩm đã được cập nhật thành công.';
                } else {
                    await ProductService.create(this.product);
                    message = 'Sản phẩm mới đã được thêm thành công.';
                }
                alert(message); // Hiển thị thông báo
                this.$router.push({ name: 'ProductManagement' });
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Có lỗi xảy ra. Vui lòng thử lại.'); // Hiển thị thông báo lỗi
            }
        }
    }
};
</script>
  
<style scoped>
.container {
    max-width: 600px;
}
</style>