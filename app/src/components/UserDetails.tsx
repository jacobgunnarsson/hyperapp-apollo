import { h } from 'hyperapp'

const renderComments = comments => (
  <ul>
    {comments.map(comment => <li>{comment.name}</li>)}
  </ul>
)

export const UserDetails = (state, actions) => ({ match }) => {
  const user = state.users.find(u => u.id === match.params.userId)

  return(
    <div
      key={match.params.userId}
      oncreate={() => actions.fetchUserDetails(match.params.userId)}
    >
      {user && user.comments && <h3>User comments</h3>}
      {user && user.comments && renderComments(user.comments)}
    </div>
  )
}
