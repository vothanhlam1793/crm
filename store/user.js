import gql from 'graphql-tag'

export const state = () => ({
    user: {},
    roles: []    
})
Array.prototype.diff = function(arr2) {
    var ret = [];
    this.sort();
    arr2.sort();
    for(var i = 0; i < this.length; i += 1) {
        if(arr2.indexOf(this[i]) > -1){
            ret.push(this[i]);
        }
    }
    return ret;
};

export const mutations = {
    updateUser(state, data){
        state.user = data;
    },
    updateRoles(state, data){
        // console.log(data);
        state.roles = data.map(function(e){
            return e.slug;
        });
        // console.log(this);
    },
    checkRoles(state, slugs){
        var ret = false;
        state.roles.forEach(function(e1){
          slugs.forEach(function(e2){
            if(e1 == e2){
              ret = true;
            }
          });
        })
        return ret;
    }
}

export const actions = {
    getRole({commit}){
        var client = this.app.apolloProvider.defaultClient;
        client.query({
            query: gql`
            query {
                User(where: {id: "${this.$auth.$state.user.id}"}){
                  name
                  roles {
                    id
                    slug
                    name
                  }
                  id
                  username
                }
              }
            `
        }).then(data => {
            commit("updateRoles", data.data.User.roles);
            commit("updateUser", data.data.User);
        }).catch(err => {
          console.log(err);
        })
    }
}