import { app } from 'hyperapp'
import logger from '@hyperapp/logger'
import { location } from '@hyperapp/router'

import { actions } from './actions'
import { state } from './state'
import { Index } from './components/index'

import '../styles/app.scss'

import {
  connectHyperApollo,
  hyperApolloState,
  connectHyperApolloWatchQuery,
} from './graphql/queries'

connectHyperApolloWatchQuery(state, actions, hyperApolloState)

console.log(state)
console.log(actions)

const appWithLogger = logger()(app)(state, actions, Index, document.body)

location.subscribe(appWithLogger.location)






