<template>
    <div class="row">
        <div class="col">
            <ViewCustomer 
                :customer="chooseCustomer"
            />
            <table class="table table-bordered table-striped">
                <tr>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>SĐT</th>
                    <th>Level</th>
                    <th>State</th>
                    <th>LD</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import ViewCustomer from '~/components/Main/ViewCustomer.vue';
export default {
    components: {
        ViewCustomer
    },
    props: ['customers'],
    data(){
        return {
            states: [{
                key: "DATA", 
                label: "Dữ liệu khô"
            }, {
                key: "LV0",
                label: "Tiếp cận"
            }, {
                key: "LV1",
                label: "Mới - cần lọc"
            }, {
                key: "LV2",
                label: "Tìm hiểu"
            }, {
                key: "LV3",
                label: "Chăm sóc"
            }, {
                key: "LV4",
                label: "Trưởng thành"
            }],
            chooseCustomer: {}
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {

    },
    mounted(){

    },
    created(){

    }
}
</script>