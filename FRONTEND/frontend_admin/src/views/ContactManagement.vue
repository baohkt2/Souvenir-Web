<template>
    <div class="container mt-4">
        <h2>Quản Lý Liên Hệ</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in contacts" :key="contact.id">
                    <td>{{ contact.name }}</td>
                    <td>{{ contact.email }}</td>
                    <td>
                        <button class="btn btn-primary" @click="selectContact(contact.id)">Xem Chi Tiết</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <contact-detail v-if="selectedContactId" :contactId="selectedContactId" />
    </div>
</template>

<script>
import ContactDetail from './ContactDetail.vue';

export default {
    components: {
        ContactDetail
    },
    data() {
        return {
            contacts: [], 
            selectedContactId: null
        };
    },
    methods: {
        selectContact(contactId) {
            this.selectedContactId = contactId;
        },
        fetchContacts() {
            
        },
    },
    mounted() {
        this.fetchContacts();
    }
};
</script>
