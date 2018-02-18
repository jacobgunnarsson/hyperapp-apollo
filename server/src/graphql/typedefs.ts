const typeDefs = `
  type User {
    id: ID!
    name: String
    username: String
    email: String
    phone: String
    website: String
    comments: [Comment]
  }

  type Comment {
    id: ID!
    postId: String
    name: String
    email: String
    body: String
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    comment(id: ID!): Comment
  }
`

export default typeDefs




