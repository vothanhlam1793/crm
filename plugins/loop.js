import gql from 'graphql-tag'
export async function createLoop(client, data){
    /*
        endDate: "",
        type: "",
        data: ""
    */
    return new Promise((resolve, reject) => {
        client.mutate({
            mutation: gql`
            mutation {
                createLoop(data: {
                    endDate: "${data.endDate}",
                    type: "${data.type}",
                    data: "${data.data}"
                }) {
                  id endDate type task {id} data
                }
            }
            `
        }).then(data => {
            resolve(data.data.createLoop);
        }).catch(err => {
            reject(err);
        });
    });
}