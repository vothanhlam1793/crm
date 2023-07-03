<template>
    <div class="row">
        <div class="col">
            <span v-for="day in month" @click="selectDay(day)" :class="getColor(day)" :key="day.value"
                style="font-size: 1em;">{{ day.title }}</span>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        // Index
    },
    props: ['clearData'],
    watch: {
        clearData(){
            this.month = [];
            this.results = [];
            this.$forceUpdate();
        }
    },
    data() {
        return {
            month: [],
            results: []
        }
    },
    methods: {
        selectDay(d) {
            // console.log("CLICK", d);
            if (d.result == "0") {
                d.result = "1";
            } else {
                d.result = "0";
            }
            this.results = this.month.map(function (item) {
                if (item.result == "1") {
                    return item.value;
                }
            });
            this.results = this.results.filter(item => item != undefined);
            this.$forceUpdate();
            this.$emit("update-data", this.results);
        },
        getColor(d) {
            if (d.result == "0") {
                return "badge badge-pill badge-secondary mx-1 my-1"
            } else if (d.result == "1") {
                return "badge badge-pill badge-warning mx-1 my-1"
            }
        }
    },
    created() {
        for (var j = 0; j < 31; j++) {
            this.month[j] = {
                value: j + 1,
                result: "0",
                title: `${j + 1}`
            }
        }
    }
}
</script>