import axios from 'axios'

//action types
const GET_USERS = 'GET_USERS'
const GET_USER = 'GET_USER'

//action creators

export const getUsers = users => {
  return {
    type: GET_USERS,
    users: users
  }
}

export const getSingleUser = user => {
  return {
    type: GET_USER,
    user: user
  }
}

//thunk creators

export const fetchUsers = () => async dispatch => {
  try {
    const {data: users} = await axios.get('/api/users')
    dispatch(getUsers(users))
  } catch (err) {
    console.log(err)
  }
}

export const fetchSingleUser = id => async dispatch => {
  try {
    const {data: user} = await axios.get(`/api/users/${id}`)
    dispatch(getSingleUser(user))
  } catch (err) {
    console.log(err)
  }
}

//reducer

const initialState = {
  users: [],
  singleUser: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.users}
    case GET_USER:
      return {...state, singleUser: action.user}
    default:
      return state
  }
}
