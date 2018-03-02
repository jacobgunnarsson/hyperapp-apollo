import { h } from 'hyperapp'
import gql from 'graphql-tag'
import { hyperApolloState } from '../graphql/queries'

export const Comments = ({ comments, deleteCommentAction }) => {
  const createDeleteCommentMutation = (comment) => () => deleteCommentAction({
    variables: { id: comment.id },
    update(proxy, { data: deleteComment }) {
      const query = {
        ...hyperApolloState.queries.userDetails.options,
        variables: { id: deleteComment.postId },
      }

      console.log(deleteComment)


      const data = proxy.readQuery(query)
      console.log(data)

    },
    optimisticResponse: {
      deleteComment: {
        id: comment.id,
        postId: comment.postId,
        __typename: 'Comment',
      },
    },
  })

  return (
    <div>
      <h3>User comments</h3>
      <ul>
        {comments.map(comment =>
          <li>
            {comment.name} <button onclick={createDeleteCommentMutation(comment)}>X</button>
          </li>)}
      </ul>
    </div>
  )
}
