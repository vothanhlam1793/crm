import gql from 'graphql-tag'
import { fragmentCustomer } from './fragments';
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
    inject('getAllCustomers', getAllCustomers);
    inject('getAllCustomersByUser', getAllCustomersByUser);
}