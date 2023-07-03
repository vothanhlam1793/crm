<template>
    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="`#myModal${task.id}`">
            +
        </button>

        <!-- The Modal -->
        <div class="modal" :id="`myModal${task.id}`">
            <div class="modal-dialog">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">{{ task.title }}</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label>Tạo đến ngày: </label>
                                    <div class="input-group mb-3">
                                        <input 
                                            class="form-control"
                                            type="date"
                                            v-model="createdToDate"
                                        />
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="button"
                                                @click="updateData()"
                                            >Tạo</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                    </div>

                </div>
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
    props: ['task'],
    data() {
        return {
            createdToDate: ""
        }
    },
    methods: {
        updateData(){
            this.$emit('update-data', new Date(this.createdToDate).toISOString());
            $(`#myModal${this.task.id}`).modal("hide");
        }
    },
    mounted(){
        this.createdToDate = moment().add(1, 'months').format("YYYY-MM-DD");
    }
}
</script>