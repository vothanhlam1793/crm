import gql from 'graphql-tag'
import { fragmentVariable } from './fragments';

export async function getVariableByItem (client, item){
    return new Promise((resolve, reject) => {
        client.query({
            query: gql`
                query {
                    allVariables (where: {
                        item: "${item.item}",
                        idItem: "${item.idItem}"
                    }) {
                        ...fVariable
                    }
                }
                ${fragmentVariable}
            `
        }).then(data => {
            resolve(data.data.allVariables);
        }).catch(err => {
            reject(err);
        });
    });
}

export async function getVariableByKey(client, item){
    return new Promise((resolve, reject) => {
        client.query({
            query: gql`
                query {
                    allVariables (where: {
                        item: "${item.item}",
                        idItem: "${item.idItem}",
                        key: "${item.key}"
                    }) {
                        ...fVariable
                    }
                }
                ${fragmentVariable}
            `
        }).then(data => {
            // console.log("KEY-VARIABLE: ", data);
            if(data.data.allVariables.length > 0){
                resolve(data.data.allVariables);   
            } else {
                resolve({});
            }
        }).catch(err => {
            reject(err);
        });
    });
}

export async function createVariable(client, variable){
    return new Promise((resolve, reject) => {
        client.mutate({
            mutation: gql`
                mutation {
                    createVariable(data: {
                        item: "${variable.item}",
                        idItem: "${variable.idItem}",
                        key: "${variable.key}",
                        value: "${variable.value}"
                    }) {
                        ...fVariable
                    }
                }
                ${fragmentVariable}
            `
        }).then(data => {
            // console.log(data);
            resolve(data.data.createVariable);
        }).catch(err => {
            reject(err);
        })
    });
}

export async function updateVariable(client, variable){
    return new Promise((resolve, reject) => {
        client.mutate({
            mutation: gql`
                mutation {
                    updateVariable(id: "${variable.id}", data: {
                        key: "${variable.key}",
                        value: "${variable.value}"
                    }){
                        ...fVariable
                    }
                }
                ${fragmentVariable}
            `
        }).then(data => {
            // console.log(data);
            resolve(data.data.updateVariable);
        }).catch(err => {
            reject(err);
        });
    });
}