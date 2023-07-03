<template>
    <div class="row">
        <div class="col">
            <table>
                <TableHead 
                    :columns="columns"
                />
                <TableBody 
                    :columns="columns"
                />
            </table>
        </div>
    </div>
</template>
<script>
import TableHead from '~/components/TaskMain/Show/TableHead.vue';
import TableBody from '~/components/TaskMain/Show/TableBody.vue';
export default {
    components: {
        TableBody,
        TableHead
    },
    data(){
        return {
            columns: [
                {
                    title: "STT"
                }, {
                    title: "Tiêu đề"
                }, {
                    title: "Nội dung gì đó"
                }, {
                    title: ""
                }
            ]
        }
    }
}
</script>