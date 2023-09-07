import Cookies from "js-cookie";
export default function (context, inject) {
  const getToken = async () => {
    var token = Cookies.get("token");
    try {
      token = JSON.parse(token);
      if(token.date + token.expires_in*1000 > (new Date()).getTime()){
        return token;
      }
    } catch (e) {
      console.log("RENEW - TOKEN");
    }
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
      // console.log(response.data);
      response.data.date = (new Date()).getTime() - 5000;
      Cookies.set('token', JSON.stringify(response.data));
      // Xử lý phản hồi ở đây
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy token:", error);
    }
  };

  const getCustomers = async (pageSize=20, currentItem=1) => {
    var token = await getToken();
    const response = await context.$axios.get(`/api/publickiotviet/customers?pageSize=${pageSize}&currentItem=${currentItem}`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Retailer: `cretasolu`,
      },
    });
    return response.data;
  }

  // Inject hàm getToken vào context
  inject("getToken", getToken);
  inject("getCustomers", getCustomers);
}
