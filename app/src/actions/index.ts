import { location } from '@hyperapp/router'
import { fetchUsers, fetchUserDetails } from '../graphql'

const usersActions = {
  fetchUsers: () => (state, actions) => fetchUsers().then(actions.loadUsers),
  fetchUserDetails: (userId) => (state, actions) => fetchUserDetails(userId).then(actions.loadUserDetails),
  loadUsers: users => (state, actions) => ({ ...state, users }),
  loadUserDetails: userDetails => (state, actions) => ({
    ...state,
    users: state.users.map(user =>
      user.id === userDetails.id ? { ...user, ...userDetails } : user
    )
  })
}

export const actions = {
  location: location.actions,
  ...usersActions,
}
