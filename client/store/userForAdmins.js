import axios from 'axios'

//action types
const GET_USERS = 'GET_USERS'
const GET_SINGLE_USER = 'GET_SINGLE_USER'

//action creators

export const getUsers = users => {
  return {
    type: GET_USERS,
    users: users
  }
}

export const getSingleUser = user => {
  return {
    type: GET_SINGLE_USER,
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
  let response

  try {
    response = await axios.get(`/api/users/${id}`)
  } catch (err) {
    console.log(err)
  }

  if (response.data) {
    dispatch(getSingleUser(response.data))
  }
}

//reducer

const initialState = {
  users: [],
  singleUser: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.users}
    case GET_SINGLE_USER:
      return {...state, singleUser: action.user}
    default:
      return state
  }
}
