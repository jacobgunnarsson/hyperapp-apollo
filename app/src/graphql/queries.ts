import gql from 'graphql-tag'
import { client } from './client'
import { ApolloQueryResult, WatchQueryOptions } from 'apollo-client'

export const hyperApolloState = {
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
      query {
        users {
          id
          name
        }
      }`,
    },
  },
}

const sliceBlankslate: ApolloQueryResult<{}> = {
  data: {},
  loading: false,
  networkStatus: undefined,
  stale: undefined,
}

export const connectHyperApollo = (state: {}, actions: {}, hyperApolloState: {}) => {
  Object.keys(hyperApolloState).forEach(stateSliceKey => {
    const stateSlice = hyperApolloState[stateSliceKey]
    const stateSliceFetch = client.query(stateSlice.options)

    actions[stateSliceKey] = {
      fetch: () => (state, actions) => stateSliceFetch.then(actions.load),
      load: result => (state, actions) => result,
    }

    state[stateSliceKey] = { ...sliceBlankslate }
  })
}

export const connectHyperApolloWatchQuery = (state: {}, actions: {}, hyperApolloState: {}) => {
  Object.keys(hyperApolloState).forEach(stateSliceKey => {
    const stateSlice = hyperApolloState[stateSliceKey]
    const watchQuery = client.watchQuery(stateSlice.options)

    state[stateSliceKey] = { ...sliceBlankslate }

    actions[stateSliceKey] = {
      fetch: () => (state, actions) => {
        actions.load(watchQuery.currentResult())

        watchQuery.subscribe(actions.load)
      },
      load: result => (state, actions) => result,
    }
  })
}

export const fetchUserDetails = (userId) => new Promise((resolve, reject) => {
  return client.query({
    query: gql`
      query {
        user(id: ${userId}) {
          id
          name
          username
          email
          phone
          website
          comments {
            name
            body
          }
        }
      }
    `
  }).then(({ data }) => resolve((data as any).user))
})
