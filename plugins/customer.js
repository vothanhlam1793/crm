import gql from 'graphql-tag'
import { fragmentCustomer,fragmentPhone } from './fragments';
export default function(context, inject){
    function getAllCustomers(){
        return new Promise((resolve, reject) => {
            var client = context.app.apolloProvider.defaultClient;
            client.query({
                query: gql`
                    query {
                        allCustomers {
                            ...fCustomer
                        }
                    }
                    ${fragmentCustomer}
                `
            }).then(data => {
                resolve(data.data.allCustomers);
            }).catch(err => {
                reject(err);
            });
        });
    }
    function getAllCustomersByUser(idUser){
        return new Promise((resolve, reject) => {
            var client = context.app.apolloProvider.defaultClient;
            client.query({
                query: gql`
                    query {
                        allCustomers {
                            ...fCustomer
                        }
                    }
                    ${fragmentCustomer}
                `
            }).then(data => {
                resolve(data.data.allCustomers);
            }).catch(err => {
                reject(err);
            });
        });
    }
    function createCustomer(customer){
        // Tạo mới một khách hàng
        // Tất cả những người được đưa vô đều được xếp vô là khách hàng - chỉ khác type
        /* 
            Tên
            Điện thoại
            Khu vực - Địa chỉ
        */
        // Tao dien thoai truoc
        if(customer.contactNumber == undefined){
            alert("Không có số điện thoại, vui lòng cập nhật số điện thoại");
            return;
        }
        createPhoneNumber({
            number: customer.contactNumber, 
            name: customer.name
        })
        .then(phone => {
            // console.log(phone);
            var client = context.app.apolloProvider.defaultClient;
            client.mutate({
                mutation: gql`
                mutation {
                    createCustomer (data: {
                        name: "${customer.name}",
                        code: "${customer.code}",
                        phones: {
                            connect: {
                                id: "${phone.id}"
                            }
                        }, 
                        note: "${customer.comments ? customer.comments:''}",
                        address: "${customer.address}"
                    }) {
                        ...fCustomer  
                    }
                }
                ${fragmentCustomer}
                `
            }).then(resp => {
                // console.log(resp);
                resolve(resp.data.createCustomer);
            }).catch(err => {
                console.log(err);
                if (err.message.includes("E11000 duplicate key error collection")) {
                    // Xử lý lỗi trùng lặp trong trường có chỉ số "code"
                    console.error("Mã đã tồn tại, vui lòng chọn mã khác.");
                  } else {
                    // Xử lý các lỗi khác
                    console.error("Lỗi không xác định:", err);
                }
            });
        }).catch(err => {
            console.error(err);
        })
        // Tao dia chi
        console.log(customer);

        // Tao khach hang
        // Ten / SDT / code

    }

    function createPhoneNumber(phone){
        return new Promise((resolve, reject) => {
            var client = context.app.apolloProvider.defaultClient;
            client.query({
                fetchPolicy: 'network-only',
                query: gql`
                        query {
                            allPhones (where: {
                                number: "${phone.number}"
                            }) {
                            ...fPhone
                            }
                        }                  
                    ${fragmentPhone}
                `
            }).then(data => {
                // console.log(data.data);
                if(data.data.allPhones.length == 0){
                    // Tao mot so moi
                    client.mutate({
                        mutation: gql`
                        mutation {
                            createPhone (data: {
                              number: "${phone.number}",
                              name: "${phone.name}"
                            }){
                                ...fPhone
                            }
                        }
                        ${fragmentPhone}
                        `
                    }).then(data => {
                        resolve(data.data.createPhone);
                    }).catch(err => {
                        reject(err);
                    })
                } else {
                    // Goi luon ket qua
                    resolve(data.data.allPhones[0]);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    function getCustomerWithCode(code){
        if(code == undefined){
            alert("Thêm code vào nào");
            return;
        }
        return new Promise((resolve, reject) => {
            var client = context.app.apolloProvider.defaultClient;
            client.query({
                query: gql`
                query {
                    allCustomers (where:{
                      code: "${code}"
                    }) {
                        ...fCustomer
                    }
                  }
                    ${fragmentCustomer}
                `
            }).then(data => {
                if(data.data.allCustomers.length > 0){
                    resolve(data.data.allCustomers[0]);
                } else {
                    resolve({});
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
    inject('getAllCustomers', getAllCustomers);
    inject('getAllCustomersByUser', getAllCustomersByUser);
    inject('createCustomer', createCustomer);
    inject('getCustomerWithCode', getCustomerWithCode);
}