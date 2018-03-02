import { h } from 'hyperapp'
import { Comments } from './Comments'

export const UserDetails = (state, actions) => ({ match }) => {
  const { user } = state.userDetails.data
  const queryOptions = { variables: { id: match.params.userId } }

  return (
    <div
      key={match.params.userId}
      oncreate={() => actions.userDetails.query(queryOptions)}
    >
      {user && user.comments &&
        <Comments
          comments={user.comments}
          deleteCommentAction={actions.deleteComment}
        />
      }
    </div>
  )
}
