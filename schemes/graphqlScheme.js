import { gql } from 'graphql-tag'

import { LocalScheme, RefreshScheme } from '~auth/runtime'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String, $password: String) {
    authenticate: authenticateUserWithPassword(username: $username, password: $password){
        token
        item {
            name
        }
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation LogOutMutation {
    unauthenticate: unauthenticateUser {
        success
    }
  }
`

export const USER_DETAILS_QUERY = gql`
    query UserDetailsQuery {
        authenticatedUser {
            id
            name
            email
            username
        }
    }
`

export default class GraphQLScheme extends LocalScheme {
  // TODO: Override relevant LocalScheme methods
    async login(credentials, { reset = true } = {}) {
      // console.log("LOGIN", RefreshScheme);
        const {
            apolloProvider: { defaultClient: apolloClient },
            $apolloHelpers,
        } = this.$auth.ctx.app
    
        // Ditch any leftover local tokens before attempting to log in
        if (reset) {
            this.$auth.reset({ resetInterceptor: false })
        }
    
        // console.log(LOGIN_MUTATION);
        // console.log(credentials);
        // Make login request
        const response = await apolloClient
        .mutate({
            mutation: LOGIN_MUTATION,
            variables: credentials,
        })
        .then(({ data }) => data);

        // console.log(response);

        var token = response.authenticate.token;

        // console.log("TOKEN SET: ", this);
        // console.log("TOKEN: ", token);
        // console.log("AUTHENTICATE: ", response);
        // Update our cookie token
        // console.log("TOKEN 1", this.token);
        this.token.set(token)
        // console.log("TOKEN 2", this.token);
        // Set our graphql-token so subsequent graphql request are authenticated
        await $apolloHelpers.onLogin(token)
    
        // Fetch user
        await this.fetchUser() // We will define this function next
        console.log(this);
        return response.authenticate.item;
    }

    fetchUser() {
      // console.log("FETCH USER");
        const {
          apolloProvider: { defaultClient: apolloClient },
        } = this.$auth.ctx.app
      
        // Token is required but not available
        // console.log("RETURN", this.check());
        // console.log("TOKEN 3", this.token);
        if (!this.check().valid) {
          // console.log("RETURN", this.check());
          return
        }
        // Try to fetch user
        return apolloClient
          .query({
            query: USER_DETAILS_QUERY,
          })
          .then(({ data }) => {
            if (!data.authenticatedUser) {
              const error = new Error(`User Data response not resolved`)
              return Promise.reject(error)
            }
            // Set the auth user
            // console.log(data);
            // console.log("AUTH", this.$auth);
            this.$auth.setUser(data.authenticatedUser)
            return data.authenticatedUser
          })
          .catch((error) => {
            this.$auth.callOnError(error, { method: 'fetchUser' })
            return Promise.reject(error)
          })
    }

    async logout() {
      // console.log("logout server", GraphQLScheme, LocalScheme);
        const {
          apolloProvider: { defaultClient: apolloClient },
          $apolloHelpers,
        } = this.$auth.ctx.app
      
        await apolloClient
          .mutate({
            mutation: LOGOUT_MUTATION,
          })
          .catch(() => {
            // Handle errors
          })
      
        // Reset regardless
        $apolloHelpers.onLogout()
        return this.$auth.reset({ resetInterceptor: false })
    }

    async refreshTokens() {
      // console.log("refresh server");
    }

    initializeRequestInterceptor() {
        // Instead of initializing axios interceptors, Do nothing
        // Since we are not using axios
    }

    reset() {
        this.$auth.setUser(false)
        this.token.reset()
    }
}