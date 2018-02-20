import { h } from 'hyperapp'

const renderComments = comments => (
  <div>
    <h3>User comments</h3>
    <ul>
      {comments.map(comment => <li>{comment.name}</li>)}
    </ul>
  </div>
)

export const UserDetails = (state, actions) => ({ match }) => {
  const user = state.users.find(u => u.id === match.params.userId)

  return (
    <div
      key={match.params.userId}
      oncreate={() => actions.fetchUserDetails(match.params.userId)}
    >
      {user && user.comments && renderComments(user.comments)}
    </div>
  )
}
