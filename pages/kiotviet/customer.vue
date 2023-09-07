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
            @click="$getToken()"
        >
            tìm kiếm
        </b-button>
        <b-button
            variant="primary"
            @click="getToken"
        >
            check
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
            // this.$getToken();
            console.log(await this.$getCustomers(50, 100));
        },
    },
};
</script>
  