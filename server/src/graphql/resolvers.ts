import { mockUsersData } from '../data/users'
import { mockCommentsData } from '../data/comments'

let users = mockUsersData
let comments = mockCommentsData

const resolvers = {
  Query: {
    users: () => users,
    user: (root, args) => users.find(user => user.id === parseInt(args.id)),
    comments: () => comments,
    comment: (root, args) => comments.find(comment => comment.id === parseInt(args.id)),
  },

  Mutation: {
    deleteComment: (root, args) => {
      const commentId = parseInt(args.id)
      const deletedComment = comments.find(comment => comment.id === commentId)

      comments = comments.filter(comment => comment.id !== commentId)

      return deletedComment
    },
  },

  User: {
    comments: (user) => comments.filter(comment => comment.postId === parseInt(user.id)),
  },

  Comment: {
    user: (comment) => users.find(user => user.id === parseInt(comment.postId))
  }
}

export default resolvers
