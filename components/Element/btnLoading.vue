<template>
    <button :disabled="status != 'IDLE'"
        :class="`btn btn-${color}`"
        @click="$emit('update-action')"
    >
        <span v-if="status == 'WAITING'" class="spinner-border spinner-border-sm"></span> {{ title }}
    </button>
</template>
<script>
    export default {
        props: ['status', 'title', 'color']
    }
</script>