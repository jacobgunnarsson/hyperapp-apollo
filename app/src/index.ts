import { app } from 'hyperapp'
import logger from '@hyperapp/logger'
import { location } from '@hyperapp/router'

import { actions } from './actions'
import { state } from './state'
import { Index } from './components/index'

import '../styles/app.scss'

const appWithLogger = logger()(app)(state, actions, Index, document.body)

location.subscribe(appWithLogger.location)






