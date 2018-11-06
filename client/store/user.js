import axios from 'axios'
import history from '../history'

//function for migrating cart
const identifyCartUpdates = (currentCart, userId) => {
  if(!localStorage.cart) {
    localStorage.setItem('quantities', JSON.stringify({}))
    localStorage.setItem('cart', JSON.stringify([]))
  }
  const unauthCart = JSON.parse(localStorage.cart)
  const unauthQuantities = JSON.parse(localStorage.quantities)
  //checking if any items in unauth cart
  if (unauthCart.length) {
    //going through each item in the unauth cart
    unauthCart.forEach(async celebrity => {
      //if there are currently items in the users cart, we need to check
      if (currentCart.celebrities.length) {
        for (let i = 0; i < currentCart.celebrities.length; i++) {
          //if the item already exists in the cart, we need to just update the quantity
          if (celebrity.id === currentCart.celebrities[i].id) {
            let updates = {
              quantity:
                +currentCart.celebrities[i].celebrityOrder.quantity +
                +unauthQuantities[celebrity.id]
            }
            await axios.put(
              `/api/users/${userId}/orders/${currentCart.id}/celebrities/${
                celebrity.id
              }`,
              updates
            )
            //if the item does not exist, we are creating a new line item for it
          } else {
            let item = {
              orderId: currentCart.id,
              celebrityId: celebrity.id,
              quantity: unauthQuantities[celebrity.id]
            }
            await axios.post(
              `/api/users/${userId}/orders/${currentCart.id}/celebrities`,
              item
            )
          }
        }
        //if there are no items in the users cart, we are creating a new record for it -- this is repetitive and can be refactored
      } else {
        let item = {
          orderId: currentCart.id,
          celebrityId: celebrity.id,
          quantity: unauthQuantities[celebrity.id]
        }
        await axios.post(
          `/api/users/${userId}/orders/${currentCart.id}/celebrities`,
          item
        )
      }
    })
  }
  localStorage.setItem('quantities', JSON.stringify({}))
  localStorage.setItem('cart', JSON.stringify([]))
}

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

export const auth = (
  method,
  email,
  password,
  firstName,
  lastName
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    await axios.get(`/api/users/${res.data.id}`)
    const {data: orders} = await axios.get(`/api/users/${res.data.id}/orders`)
    const currentCart = orders.filter(order => order.status === 'Pending')[0]
    identifyCartUpdates(currentCart, res.data.id)
    dispatch(getUser(res.data))
    console.log('history', history)
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
