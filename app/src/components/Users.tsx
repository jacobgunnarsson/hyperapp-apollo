import { h } from 'hyperapp'
import { Route, Link } from '@hyperapp/router'
import { UserDetails } from './UserDetails'

export const Users = (state, actions) => ({ match }) => {
  const {
    data,
    loading,
  } = state.users

  return (
    <div oncreate={actions.users.query}>
      {loading && <h2>Loading</h2>}

      {!loading && data.users && <h2>Users</h2>}

      {!loading && data.users && data.users.map(user =>
        <div>
          <Link to={`${match.path}/${user.id}`}>{user.name}</Link>
        </div>
      )}

      <Route
        path={`${match.path}/:userId`}
        render={UserDetails(state, actions)}
      />
    </div>
  )
}
