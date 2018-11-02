import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const updateUser = user => ({type: UPDATE_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    if (res.data) {
      const newRes = await axios.get(`/api/users/${res.data.id}`)
      dispatch(getUser(newRes.data))
    } else {
      dispatch(getUser(defaultUser))
    }
  } catch (err) {
    console.error(err)
  }
}

export const fetchUpdatedUser = (userId, updates) => async dispatch => {
  try {
    const {data: user} = await axios.put(`/api/users/${userId}`, updates)
    dispatch(updateUser(user))
  } catch (error) {
    console.log(error)
  }
}

export const auth = (method, email, password, firstName, lastName) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password, firstName, lastName})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}
