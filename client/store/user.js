import axios from 'axios'
import history from '../history'

//function for migrating cart
const identifyCartUpdates = (currentCart, userId) => {
  if (!localStorage.cart || !localStorage.quantities) {
    localStorage.setItem('quantities', JSON.stringify({}))
    localStorage.setItem('cart', JSON.stringify([]))
  }
  const unauthCart = JSON.parse(localStorage.cart)
  const unauthQuantities = JSON.parse(localStorage.quantities)
  console.log('before logic in identify cart')
  //checking if any items in unauth cart
  if (unauthCart.length) {
    console.log('unauth cart has length')
    //going through each item in the unauth cart
    let match
    unauthCart.forEach(async celebrity => {
      match = false
      console.log('celebrity after forEach', celebrity)
      //if there are currently items in the users cart, we need to check
      if (currentCart.celebrities.length) {
        console.log('current cart has length')
        for (let i = 0; i < currentCart.celebrities.length; i++) {
          //if the item already exists in the cart, we need to just update the quantity
          if (celebrity.id === currentCart.celebrities[i].id) {
            match = true
            console.log('celebrity matches item in curr cart', celebrity)
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
          } 
        } 
        if(!match) {
          console.log('item does not exist in current cart', celebrity)
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
        //if there are no items in the users cart, we are creating a new record for it -- this is repetitive and can be refactored
      } else {
        console.log('current cart does not have length')
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
  console.log('resetting local storage')
  localStorage.setItem('quantities', JSON.stringify({}))
  localStorage.setItem('cart', JSON.stringify([]))
}

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})

const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    if (res.data) {
      console.log('me thunk')
      const newRes = await axios.get(`/api/users/${res.data.id}`)
      dispatch(getUser(newRes.data))
    } else {
      dispatch(getUser(defaultUser))
    }
  } catch (err) {
    console.error(err)
  }
}

// export const fetchUpdatedUser = (userId, updates) => async dispatch => {
//   try {
//     const {data: user} = await axios.put(`/api/users/${userId}`, updates)
//     dispatch(updateUser(user))
//   } catch (error) {
//     console.log(error)
//   }
// }

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
    console.log('after fetchingcurrent cart')
    await identifyCartUpdates(currentCart, res.data.id)
    console.log('after identify updates')
    dispatch(getUser(res.data))
    console.log('after get user dispatch')
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
    default:
      return state
  }
}
