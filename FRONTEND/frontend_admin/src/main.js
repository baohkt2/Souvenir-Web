import { createApp } from "vue";
import { createPinia } from 'pinia';
import UserService from "@/services/user.service";
import { UserStore } from "@/stores/userStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/base.css";
import "./assets/style-home.css";

import router from "./router";
import App from "./App.vue";

const app = createApp(App);

// Sử dụng Pinia
app.use(createPinia());
// Sử dụng Vue Router
app.use(router);
// Mount ứng dụng
app.mount('#app');

// Gọi refresh token khi khởi động ứng dụng
async function refresh() {
    const userStore = UserStore();
    try {
        let rf = await UserService.refreshToken();
        if (rf) userStore.logIn();
        
    } catch (error) {
        userStore.logOut();
    }
}
refresh();


