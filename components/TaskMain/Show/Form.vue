<template>
    <div class="row">
        <div class="col">
            <h4>Show</h4>
            <Table 
                :tasks="tasks"
                :update="update"
            />
        </div>
    </div>
</template>
<script>
import Table from '~/components/TaskMain/Show/TableV1.vue';
import {allTaskMains} from '~/plugins/task.js'
import {getVariableByItem} from '~/plugins/variable.js'
export default {
    components: {
        // Index
        Table
    },
    data(){
        return {
            tasks: [],
            update: 0
        }
    },
    mounted(){
        // return;
        var that = this;
        allTaskMains(this.$apolloProvider.defaultClient).then(data => {
            that.tasks = data;
            // console.log(data);
            that.tasks.forEach(function(task){
                task.variables = [];
                getVariableByItem(that.$apolloProvider.defaultClient, {
                    item: "Task",
                    idItem: task.id
                }).then(variables => {
                    task.variables = variables;
                    // console.log(task);
                    that.update += 1;
                });
            });
        })
    }
}
</script>