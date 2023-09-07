<template>
    <div class="row">
        <div class="col">
            <table class="table table-bordered table-striped">
                <tr>
                    <th>Giai đoạn</th>
                    <th>Số lượng</th>
                    <th>Hành động</th>
                </tr>
                <tr
                    v-for="state, index in states"
                    :key="index"
                >
                    <td>{{ state.label }}</td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    components: {

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
            }]
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