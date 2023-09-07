<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Thêm khách</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <Request />
            </div>
        </div>
    </div>
</template>
<script>
import Request from '~/components/Main/Request.vue';
export default {
    name: 'IndexPage',
    layout: "app",
    components: {
        Request
    },
    data(){
        return {
            customers: []
        }
    },
    methods: {
        getAllCustomers(){
            this.$getAllCustomers().then(datav => {
                console.log(datav);
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted(){
        this.getAllCustomers();
    }
}
</script>
