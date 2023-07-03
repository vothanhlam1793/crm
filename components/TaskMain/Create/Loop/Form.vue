<template>
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label>Lặp lại: </label>
                        <select class="form-control" v-model="type">
                            <option value="NONE" selected>Không lặp lại</option>
                            <option value="DAY">Mỗi ngày</option>
                            <option value="WEEK">Mỗi tuần</option>
                            <option value="MONTH">Mỗi tháng</option>
                            <option value="YEAR">Mỗi năm</option>
                        </select>
                    </div>
                    <div class="form-group" v-if="type!='NONE'">
                        <label>Ngày kết thúc: </label>
                        <input 
                            type="date"
                            v-model="endDate"
                            class="form-control"
                            @change="updateData"
                        />
                    </div>
                </div>
                <div class="col-8" v-if="type != 'NONE'">
                    <div v-if="type == 'WEEK'">
                        <p>Chọn ngày trong tuần:</p>
                        <Week @update-data="updateWeek" 
                        :clearData="clearData"
                        />
                    </div>
                    <div v-if="type == 'MONTH'">
                        <p>Chọn ngày lặp lại trong tháng:</p>
                        <Month @update-data="updateMonth" 
                        :clearData="clearData"
                        />
                    </div>
                    <div v-if="type == 'YEAR'">
                        <p>Chọn ngày lặp lại trong năm:</p>
                        <input 
                            class="form-control"
                            type="date"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Month from '~/components/TaskMain/Create/Loop/Month.vue';
import Week from '~/components/TaskMain/Create/Loop/Week.vue';
export default {
    components: {
        Month,
        Week
    },
    props: ['clearData'],
    watch: {
        clearData(){
            this.endDate = "";
            this.type = "NONE";
            this.dataLoop = "";
            this.$forceUpdate();
        }
    },
    data() {
        return {
            endDate: "",
            type: "NONE",
            dataLoop: ""
        }
    },
    methods: {
        updateData() {
            this.$emit("update-data", {
                endDate: this.endDate,
                type: this.type,
                data: this.dataLoop

            });
        },
        updateWeek(results) {
            this.dataLoop = JSON.stringify(results);
            this.updateData();
        },
        updateMonth(results) {
            this.dataLoop = JSON.stringify(results);
            this.updateData();
        },
    },
    mounted(){
        this.endDate = moment().add(6, 'months').format("YYYY-MM-DD");
    }
}
</script>