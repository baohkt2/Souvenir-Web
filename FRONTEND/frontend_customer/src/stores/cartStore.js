import { defineStore } from 'pinia';

export const CartStore = defineStore('cart', {
    state: () => ({
        products: [],
    }),
    getters: {
        totalQuantity: (state) => {
            return state.products.reduce((total, product) => total + product.quantity, 0);
        },
        totalPrice: (state) => {
            return state.products.reduce((total, product) => total + (product.quantity * product.price), 0);
        }
    },
    actions: {
        addProduct(product) {
            const existingProduct = this.products.find(p => p._id === product._id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                this.products.push({ ...product, quantity: 1 });
            }
        },
        removeProduct(productId) {
            this.products = this.products.filter(p => p._id !== productId);
        },
        updateQuantity(productId, quantity) {
            const product = this.products.find(p => p._id === productId);
            if (product) {
                product.quantity = quantity;
            }
        }
    }
});
