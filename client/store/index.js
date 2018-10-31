import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import celebrities from './celebrities'

const reducer = combineReducers({user, celebrities})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

console.log('THIS IS THE STORE FROM /STORE/INDEX.JS', store)

export default store
export * from './user'
// export * from './celebrities'
