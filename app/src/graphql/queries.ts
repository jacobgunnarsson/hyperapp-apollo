import gql from 'graphql-tag'
import { client } from './client'
import { ApolloQueryResult, WatchQueryOptions } from 'apollo-client'

const defaultQueryOptions = {
  fetchPolicy: 'cache-first',
}

export const hyperApolloState = {
  queries: {
    users: {
      options: {
        query: gql`
        query {
          users {
            id
            name
          }
        }`,
      },
    },
    userDetails: {
      options: {
        query: gql`
        query user($id: ID!) {
          user(id: $id) {
            id
            name
            username
            email
            phone
            website
            comments {
              id
              name
              body
            }
          }
        }`,
      },
    },
  },
  mutations: {
    deleteComment: {
      options: {
        mutation: gql`
        mutation deleteComment($id: ID!) {
          deleteComment(id: $id) {
            id
            postId
          }
        }`,
      },
    },
  },
}

const blankResult: ApolloQueryResult<{}> = {
  data: {},
  loading: false,
  networkStatus: undefined,
  stale: undefined,
}

export const connectHyperApollo = (state, actions) => {
  const queries = hyperApolloState.queries
  const mutations = hyperApolloState.mutations

  // Map queries
  Object.keys(queries).forEach(query => {
    state[query] = { ...blankResult }

    actions[query] = {
      query: (componentOptions) => (state, actions) => {
        const queryOptions = queries[query].options
        const watchQuery = client.watchQuery({
          ...defaultQueryOptions,
          ...queryOptions,
          ...componentOptions,
        })

        actions.load(watchQuery.currentResult())

        watchQuery.subscribe(actions.load)
      },
      load: (result) => (state, actions) => result,
    }
  })

  // Map mutations
  Object.keys(mutations).forEach(mutation => {
    actions[mutation] = (componentOptions) => (state, actions) => {
      const mutationOptions = mutations[mutation].options

      client.mutate({
        ...mutationOptions,
        ...componentOptions,
      })
    }
  })
}
