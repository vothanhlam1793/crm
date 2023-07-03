<template>
    <tr>
        <td class="text-center">{{ index + 1 }}</td>
        <td>{{ task.title }}</td>
        <td>{{ childCreated }} 
        <CreateChildModal 
            :task="task"
            @update-data="updateEndDateCreate"
        />
        </td>
        <td>{{ task.taskChilds.length }}</td>
    </tr>
</template>
<script>
import {createTaskMainChild} from '~/plugins/task.js'
import CreateChildModal from '~/components/TaskMain/Show/TableCreateChildModal.vue';
export default {
    components: {
        // Index
        CreateChildModal
    },
    props: ['task', 'index', 'update'],
    watch: {
        update(){
            this.taskChildCreated();
            this.$forceUpdate();
        }
    },
    data() {
        return {
            childCreated: ""
        }
    },
    methods: {
        taskChildCreated(){
            var that = this;
            this.task.variables.forEach(function(variable){
                if(variable.key == 'TO_DATE_CREATED') {
                    that.childCreated = variable.value;
                }
            })
        },
        updateEndDateCreate(date){
            console.log("update end date create", date);
            createTaskMainChild(this.$apolloProvider.defaultClient, this.task, date).then(tasks => {
                console.log(tasks);
            }).catch(err => {
                console.log(err);
            });
        }
    },
}
</script>