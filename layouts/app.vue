<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col"
            v-if="isMobile == false"
            >
                <Menu />
            </div>
            <div class="col"
            v-else
            >
                <MenuMobile />
            </div>
        </div>
        <div class="">
            <Nuxt />
        </div>
    </div>
</template>
<style>
.checkbox-lg .form-check-input{
    top: .8rem;
    scale: 1.4;
    margin-right: 0.7rem;
 }

.checkbox-lg .form-check-label {
    padding-top: 13px;
}

input.larger {
    /* top: 1.2rem; */
    scale: 2;
    margin-right: 0.8rem;
    margin-left: 0.8rem;
    /* transform: scale(3); */
    /* margin: 5px; */
}

.checkbox-xl .form-check-label {
    padding-top: 19px;
}
</style>
<script>
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
export default {
    data(){
        return {
            isMobile: false
        }
    },
    methods: {
        checkMobile: detectMob
    },
    mounted(){
        this.isMobile = detectMob();
    }
}
</script>