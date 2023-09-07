<template>
    <div>
        <input
            type="text"
            v-model="searchTerm"
            placeholder="Nhập từ khóa tìm kiếm"
            class="form-control"
        />
        <b-button
            variant="primary"
            @click="getToken"
        >
            tìm kiếm
        </b-button>

    </div>
</template>
  
<script>
export default {
    layout: "app",
    data() {
        return {
            searchTerm: '',
            searchResults: [],
        };
    },
    methods: {
        async getToken() {
            this.$getToken();
        },
    },
};
</script>
  