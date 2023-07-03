<template>
    <div class="container">
        <form @submit.prevent="userLogin">
            <div class="form-group">
                <label>Tên đăng nhập</label>
                <input class="form-control" type="text" v-model="login.username" />
            </div>
            <div class="form-group">
                <label>Mật khẩu</label>
                <input class="form-control" type="password" v-model="login.password" />
            </div>
            <div class="text-center">
                <button class="btn btn-success" type="submit">Đăng nhập</button>
            </div>
        </form>
        <div class="text-center my-4">
            <div :class="color">
                {{ alert }}
            </div>
        </div>
    </div>
</template>
  
<script>
const credentials = { username: 'examlple', password: 'asrkpvg7' }
export default {
    data() {
        return {
            login: {
                username: '',
                password: ''
            },
            alert: "",
            color: ""
        }
    },
    methods: {
        async userLogin() {
            var that = this;
            credentials.username = this.login.username;
            credentials.password = this.login.password;
            try {
                await this.$auth.loginWith('graphql', credentials)
                    .then((data) => {
                        that.$router.push("/");
                    }).catch((err) => {
                        console.log("FAIL", err);
                        that.alert = "Đăng nhập thất bại - do sai thông tin";
                        that.color = "alert alert-danger";
                    })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>