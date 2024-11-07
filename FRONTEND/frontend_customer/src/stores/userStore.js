import { defineStore } from 'pinia';

export const UserStore = defineStore({
    id: 'user',
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        logIn() {
            this.isLoggedIn = true;
        },
        logOut() {
            this.isLoggedIn = false;
        },
    }
});
