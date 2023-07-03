<template>
    <div class="row">
        <div class="col">
            <label>Đánh giá kết quả</label>
            <div>
                <ul class="list-group">
                    <li class="list-group-item"
                    v-for="todo in todos"
                    ><span
                        @click="deleteTodo(todo)"
                    ><i class="fa-regular fa-circle-xmark"></i></span> - {{ todo.content }}</li>
                </ul> 
            </div>
            <div class="form-group">
                <input
                    id="todo"
                    class="form-control"
                    v-model="inpTodo"
                    @keydown.enter="addTodo"
                    placeholder="Thêm dữ kiện nè"
                >
            </div>
        </div>
    </div>
</template>
<script>
// import Index from '~/components/Filter/Table/Index.vue';
export default {
    components: {
        // Index
    },
    props: ['clearData'],
    data(){
        return {
            todos: [],
            inpTodo: "",
            counter: 0
        }
    },
    watch: {
        clearData(){
            this.todos = [];
            this.inpTodo = "";
            this.counter = 0;
            this.$forceUpdate();
        }
    },
    methods: {
        addTodo(){
            this.todos.push({
                content: this.inpTodo,
                id: this.counter ++,
                flag: "",
                done: false
            });
            this.inpTodo = "";
            this.updateData();
        },
        deleteTodo(todo){
            for(var j = 0; j < this.todos.length; j++){
                if(this.todos[j].id == todo.id){
                    this.todos.splice(j,1);
                    break;
                }
            }
            this.updateData();
        },
        updateData(){
            this.$emit("update-data", this.todos);
        }
    }
}
</script>