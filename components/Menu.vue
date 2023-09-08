<template>
  <nav class="navbar navbar-expand-sm bg-light mb-3 sticky-top">
    <ul class="navbar-nav">

      <li class="nav-item">
        <a class="nav-link" href="/">Trang chủ</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/request">Thêm khách</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/kiotviet/customer">KiotViet-Customer</a>
      </li>
      <li class="nav-item ml-5">
        <LoginButton></LoginButton>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  methods: {
    getDateKetSo() {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var d1 = new Date(firstDay - 1000);
      var a = "00" + (d1.getMonth() + 1).toString();
      a = a.substring(a.length - 2, a.length)
      return `${d1.getFullYear()}/${a}`
    },
    checkRole(slugs) {
      var ret = false;
      this.roles.forEach(function (e1) {
        slugs.forEach(function (e2) {
          if (e1 == e2) {
            ret = true;
          }
        });
      })
      return ret;
    }
  },
  watch: {
    roles: function (newR, oldR) {

    }
  },
  computed: {
    roles() {
      return this.$store.state.user.roles;
    }
  },
  mounted() {
    if (this.$store.$auth.$state.loggedIn) {
      this.$store.dispatch("user/getRole");
    } else {
      if (this.$route.path == "/login") {

      } else {
        location.href = "/login"
      }
    }
  }
}
</script>