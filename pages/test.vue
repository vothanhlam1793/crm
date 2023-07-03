<template>
    <div class="row">
        <div class="col">
            <Form />
        </div>
    </div>
</template>

<script>
import Form from '~/components/TaskMain/Show/Form.vue';
import FormCreate from '~/components/TaskMain/Create/Form.vue';
export default {
    components: {
        Form,
        FormCreate
    },
    name: 'IndexPage',
    methods: {

    },
    mounted(){
        // console.log(this);
    },
    layout: "app"
}
</script>
