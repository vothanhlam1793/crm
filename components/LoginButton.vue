<template>
    <div>
        <a v-if="$store.$auth.$state.loggedIn == false"  class="nav-link" href="/login">Đăng nhập</a>
        <a v-else class="nav-link" @click="logout()">Đăng xuất</a>
    </div>
</template>
<script>
export default {
    methods: {
        logout(){
            this.$auth.logout();
        }
    },
    mounted(){

    }
}
</script>