// middleware/auth.js

export default function ({ app, redirect }) {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!app.$auth.loggedIn) {
      return redirect('/login') // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    }
  }
  