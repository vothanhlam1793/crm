<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Tổng quan</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <Squal />
            </div>
        </div>
    </div>
</template>
<script>
// import {allTaskMains} from '~/plugins/task.js'
import Squal from '~/components/Main/Squal.vue';
export default {
    name: 'IndexPage',
    layout: "app",
    components: {
        Squal
    },
    methods: {
        alertMessage(){
            this.$getAllCustomersByUser().then(datav => {
                console.log(datav);
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted(){
        this.alertMessage();
    }
}
</script>
