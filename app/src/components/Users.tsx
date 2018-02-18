import { h } from 'hyperapp'
import { Route, Link } from '@hyperapp/router'
import { UserDetails } from './UserDetails'

export const Users = (state, actions) => ({ match }) => (
  <div oncreate={actions.fetchUsers}>
    {state.users && <h2>Users</h2>}

    {state.users && state.users.map(user =>
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
