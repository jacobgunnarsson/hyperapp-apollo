import users from '../data/users'
import comments from '../data/comments'

const resolvers = {
  Query: {
    users: () => users,
    user: (root, args) => users.find(user => user.id === parseInt(args.id)),
    comment: (root, args) => comments.find(comment => comment.id === parseInt(args.id)),
  },

  User: {
    comments: (user) => comments.filter(comment => comment.postId === parseInt(user.id)),
  },

  Comment: {
    user: (comment) => users.find(user => user.id === parseInt(comment.postId))
  }
}

export default resolvers
