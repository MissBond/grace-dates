import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import celebrities from './celebrities'
import oneCelebrity from './single-celebrity'
import orders from './orders'

const reducer = combineReducers({user, celebrities, oneCelebrity, orders})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './celebrities'
export * from './single-celebrity'
export * from './orders'
