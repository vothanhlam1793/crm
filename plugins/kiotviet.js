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
    const response = await context.$axios.get(`/api/publickiotviet/customers?includeCustomerGroup=true&pageSize=${pageSize}&currentItem=${currentItem}&includeTotal=true`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Retailer: `cretasolu`,
      },
    });
    return response.data;
  }

  const getInvoices = async (pageSize=20, currentItem = 1) => {
    var token = await getToken();
    const response = await context.$axios.get(`/api/publickiotviet/invoices?pageSize=${pageSize}&currentItem=${currentItem}`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Retailer: `cretasolu`,
      },
    });
    return response.data;
  }

  const getCustomerWithCodeKiotViet = async (code) => {
    if(code == undefined){
      alert("Vui lòng nhập code để tải thông tin");
      return;
    }
    var token = await getToken();
    const response = await context.$axios.get(`/api/publickiotviet/customers/code/${code}`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Retailer: `cretasolu`,
      },
    });
    return response.data;
  }

  const getInvoicesWithCustomerCodeKiotViet = async (code, pageSize=20, currentItem = 1) => {
    if(code == undefined){
      alert("Vui lòng nhập code để tải thông tin");
      return;
    }
    var token = await getToken();
    const response = await context.$axios.get(`/api/publickiotviet/invoices?customerCode=${code}&pageSize=${pageSize}&currentItem=${currentItem}`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Retailer: `cretasolu`,
      },
    });
    return response.data;
  }

  const getAllInvoicesWithCustomerCodeKiotViet = async (code) => {
    if(code == undefined){
      alert("Vui lòng nhập code để tải thông tin");
      return;
    }
    var data = await getInvoicesWithCustomerCodeKiotViet(code, 100, 0);
    var invoices = data.data;
    for(var i = 0; i < data.total/100; i++){
      var data1 = await getInvoicesWithCustomerCodeKiotViet(code, 100, 100*(i+1));
      invoices = invoices.concat(data1.data);
    }
    return invoices;
  };
  // Inject hàm getToken vào context
  inject("getToken", getToken);
  inject("getCustomers", getCustomers);
  inject("getCustomerWithCodeKiotViet", getCustomerWithCodeKiotViet);
  inject("getInvoicesWithCustomerCodeKiotViet", getInvoicesWithCustomerCodeKiotViet);
  inject("getAllInvoicesWithCustomerCodeKiotViet", getAllInvoicesWithCustomerCodeKiotViet);
  inject("getInvoices", getInvoices);
}
