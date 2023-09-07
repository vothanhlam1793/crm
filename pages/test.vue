<template>
    <div class="container">
        <b-button
            variant="primary"
            @click="alertMessage"
        >Hello</b-button>
    </div>
</template>

<script>
import {allTaskMains} from '~/plugins/task.js'
// import Index from '~/components/Filter/Table/Index.vue';
export default {
    name: 'IndexPage',
    layout: "app",
    methods: {
        alertMessage(){
            allTaskMains(this.$apolloProvider.defaultClient)
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
            console.log("Hello From ERP Creta");
            this.$hello();
            this.$getAllCustomers().then(data => {
                console.log(data);
            }).catch (err => {
                console.log(err);
            });
        }
    }
}
</script>
