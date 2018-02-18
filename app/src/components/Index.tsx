import { h } from 'hyperapp'
import { Route } from '@hyperapp/router'
import { Navigation } from './Navigation'
import { Users } from './Users'

export const Index = (state, actions) => (
  <main>
    <Navigation />

    <Route render={() => <h1>Hello!</h1>} />
    <Route parent path="/users" render={Users(state, actions)} />
  </main>
)
