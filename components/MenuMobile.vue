<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <button
                    class="navbar-toggler"
                    type="button"
                    @click="toggleNav()"
                >
                    <i class="fas fa-bars text-dark"></i>
                </button>
            </div>
        </nav>
        <div class="collapse" id="navbarToggleExternalContent2">
            <Menu />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            state: "CLOSE"
        }
    },
    methods: {
        toggleNav(){
            if(this.state == "CLOSE"){
                this.state = "OPEN";
                $("#navbarToggleExternalContent2").collapse("show");
            } else {
                this.state = "CLOSE";
                $("#navbarToggleExternalContent2").collapse("hide");
            }
        }
    },
    mounted(){
        $("#navbarToggleExternalContent2").collapse("hide");
    },
    created(){

    }
}
</script>