import gql from 'graphql-tag'
import { client } from './client'

export const fetchUsers = () => new Promise((resolve, reject) => {
  return client.query({
    query: gql`
      query {
        users {
          id
          name
        }
      }
    `
  }).then(({ data }) => resolve((data as any).users))
})

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
