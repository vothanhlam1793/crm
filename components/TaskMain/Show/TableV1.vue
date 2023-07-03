<template>
    <div class="row">
        <div class="col">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr class="text-center">
                        <th style="width: 10%;">STT</th>
                        <th style="width: 30%;">Tiêu đề</th>
                        <th style="width: 40%;">Nội dung</th>
                        <th style="width: 20%;"></th>
                    </tr>
                </thead>
                <tbody>
                    <TableItem 
                        v-for="task, index in tasks"
                        :key="task.id"
                        :task="task"
                        :index="index"
                        :update="update"
                    />
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import TableItem from '~/components/TaskMain/Show/TableItem.vue';
export default {
    components: {
        TableItem
    },
    props: ['tasks', 'update'],
    watch: {

    },
    data(){
        return {
            
        }
    }
}
</script>