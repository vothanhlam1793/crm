import gql from 'graphql-tag'
import { fragmentInvoice } from './fragments';

export default function(context, inject){ 
    function createInvoice(invoice, customer){
        // ${tag.title ? 'title: "' + tag.title + '",' : ''}
        console.log(`
        mutation {
            createInvoice (data:{
                code: "${invoice.code}",
                createdDate: "${invoice.createdDate}",
                purchaseDate: "${invoice.purchaseDate}",
                customer: {
                    connect: {
                        id: "${customer.id}"
                    }
                },
                description: "${invoice.description}",
                invoiceDetails: "${JSON.stringify(invoice.invoiceDetails).replace(/"/g, '\\"')}",
                total: ${invoice.total},
                status: ${invoice.status},
                statusValue: "${invoice.statusValue}"
            }) {
                ...fInvoice
            }
        }
        ${fragmentInvoice}
        `);
        return new Promise((resolve, reject) => {
            var client = context.app.apolloProvider.defaultClient;
            client.mutate({
                mutation: gql`
                mutation {
                    createInvoice (data:{
                        code: "${invoice.code}",
                        createdDate: "${invoice.createdDate}",
                        purchaseDate: "${invoice.purchaseDate}",
                        customer: {
                            connect: {
                                id: "${customer.id}"
                            }
                        },
                        description: "${invoice.description}",
                        invoiceDetails: "${JSON.stringify(invoice.invoiceDetails).replace(/"/g, '\\"')}",
                        total: ${invoice.total},
                        status: ${invoice.status},
                        statusValue: "${invoice.statusValue}"
                    }) {
                        ...fInvoice
                    }
                }
                ${fragmentInvoice}
                `
            }).then(data => {
                resolve(data.data.createInvoice);
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
        });
    }
    inject("createInvoice", createInvoice);
}