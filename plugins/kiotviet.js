import Cookies from "js-cookie";
export default function (context, inject) {
  const getToken = async () => {
    const formData = new FormData();
    formData.append("scopes", "PublicApi.Access");
    formData.append("grant_type", "client_credentials");
    formData.append("client_id", "bae3bcbe-c860-4bac-9e4a-0651dcf4bad0");
    formData.append(
      "client_secret",
      "0D92F5E0DF1973CC5385348F42C665D8775E7468"
    );

    const params = new URLSearchParams(formData);
    try {
      const response = await context.$axios.post(
        "/api/kiotviet/connect/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
      // Xử lý phản hồi ở đây
    } catch (error) {
      console.error("Lỗi khi lấy token:", error);
    }
  };

  // Inject hàm getToken vào context
  inject("getToken", getToken);
}
