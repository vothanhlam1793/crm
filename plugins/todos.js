import gql from 'graphql-tag'
import { fragmentListMain } from './fragments';
export async function createTodo(client, todo){
    /*
        {
            content: "",
            flag: "",
            done: ""
        }
    */
    // console.log(todo);
    return new Promise((resolve, reject) => {
        client.mutate({
            mutation: gql`
            mutation {
                createTodo(data: {
                    content: "${todo.content.replace(/"/g, '\\"')}",
                    flag: "${todo.flag.replace(/"/g, '\\"')}",
                    done: ${todo.done}
                }) {
                    id content flag done list {id}
                }
              }
            `
        }).then(data => {
            resolve(data.data.createTodo);
        }).catch(err => {
            reject(err);
        });
    });
}

export async function createList(client, todos){
    /*
        {
            todos: "",
            type: "TASK",
        }
    */
    // console.log(todos);
    return new Promise(async (resolve, reject) => {
        var tds = [];
        for(var j = 0; j < todos.length; j++){
            let t = await createTodo(client, todos[j]);
            tds.push(t);
        };
        let str = `[`;
        tds.forEach(function(td, index){
            if(index != 0){
                str += `,`;
            }
            str += `{id: "${td.id}"}`
        });
        str += `]`;
        client.mutate({
            mutation: gql`
            mutation {
                createList(data: {
                    todos: {
                        connect: ${str}
                    },
                    type: "TASK"  
                }){
                  ...fListMain
                }
            }
            ${fragmentListMain}
            `
        }).then(data => {
            resolve(data.data.createList);
        }).catch(err => {
            reject(err);
        });
    });
}

export async function getListById(client, idList){
    return new Promise((resolve, reject) => {
        client.query({
            query: gql`
            query {
                List(where: {id: "${idList}"}){
                    ...fListMain
                }
            }
            ${fragmentListMain}
            `
        }).then(data => {
            // console.log(data);
            resolve(data.data.List);
        }).catch(err => {
            // console.log(err);
            reject(err);
        });
    });
}

export async function duplicateList(client, idList){
    return new Promise((resolve, reject) => {
        getListById(client, idList).then(data => {
            // console.log(data);
            createList(client, data.todos).then(list => {
                // List moi duoc tao ra
                resolve(list);
            }).catch(err => {
                // console.log(err);
            })
        }).catch (err => {
            // console.log(err);
            reject(err);
        })
    });
}