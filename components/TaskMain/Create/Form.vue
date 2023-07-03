<template>
    <div class="row p-3">
        <div class="col border border-success rounded p-2">
            <div class="form-group">
                <label for="title">Tiêu đề</label>
                <input id="title" placeholder="Tiêu đề" type="text" v-model="title" class="form-control">
            </div>
            <div class="form-group">
                <label for="description">Mô tả</label>
                <textarea
                    id="description"
                    class="form-control"
                    v-model="description"
                    rows="7"
                ></textarea>
            </div>
            <div class="form-group text-center my-3">
                <ButtonLoading 
                    @update-action="createTaskMain()"
                    :color="btnLoading.color"
                    :title="btnLoading.title"
                    :status="btnLoading.status"
                />
            </div>
        </div>
        <div class="col">
            <Loop 
                class="border border-info p-2 rounded"
                @update-data="updateLoop"
                :clearData="clearData"
            />
            <Todos 
                class="border border-danger p-2 rounded"
                @update-data="updateToDos"
                :clearData="clearData"
            />
        </div>
    </div>
</template>
<script>
import Todos from '~/components/TaskMain/Create/Todo.vue';
import Loop from '~/components/TaskMain/Create/Loop/Form.vue';
import ButtonLoading from '~/components/Element/btnLoading.vue';

import {createLoop} from '~/plugins/loop.js'
import {createList, createTodo, duplicateList} from '~/plugins/todos.js'
import {createTaskMain} from '~/plugins/task.js'

export default {
    components: {
        Todos,
        Loop,
        ButtonLoading
    },
    data() {
        return {
            type: "TASK_MAIN",
            title: "",
            description: "",
            todos: [],
            loop: {},
            btnLoading: {
                status: "IDLE",
                title: "Tạo mới",
                color: "primary"
            },
            clearData: 0
        }
    },
    methods: {
        updateToDos(todos){
            this.todos = todos;
        },
        updateLoop(loop){
            this.loop = loop;
        },
        async createTaskMain(){
            this.btnLoading.status = "WAITING"
            if(this.title == ""){
                alert("Không được để trống tiêu đề!.");
                var that = this;
                setTimeout(()=>{
                    that.btnLoading.status = "IDLE";
                }, 400);
                return;
            }
            let loop = {};
            let list = {};
            if(this.loop.endDate){
                loop = await createLoop(this.$apolloProvider.defaultClient, this.loop);
            }
            if(this.todos.length > 0){
                list = await createList(this.$apolloProvider.defaultClient, this.todos);
            }
            let t = await createTaskMain(this.$apolloProvider.defaultClient, {
                title: this.title.replace(/\n/g, '\\n').replace(/"/g, '\\"'),
                description: this.description.replace(/\n/g, '\\n').replace(/"/g, '\\"'),
                loop: loop,
                list: list,
                type: this.type
            });
            this.title = "";
            this.description = "";
            this.todos = [];
            this.loop = {};
            this.btnLoading.status = "IDLE";
            this.clearData += 1;    // Xoá các dữ liệu mới tạo
            alert("Đã tạo thành công TASK mới");
        }
    }
}
</script>