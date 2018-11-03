import axios from 'axios'

//initial state
const initialState = {
  currentOrder: {},
  orders: []
}

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const CHECKOUT_CURRENT_ORDER = 'CHECKOUT_CURRENT_ORDER'
const CLEAR_ORDERS = 'CLEAR_ORDERS'

export const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})
export const addItem = order => ({type: ADD_ITEM, order})
export const deleteItem = order => ({type: DELETE_ITEM, order})
export const updateQuantity = order => ({type: UPDATE_QUANTITY, order})
export const checkoutCurrentOrder = order => ({
  type: CHECKOUT_CURRENT_ORDER,
  order
})
export const clearOrders = () => ({type: CLEAR_ORDERS})

export const fetchAllOrders = userId => async dispatch => {
  try {
    const {data: orders} = await axios.get(`/api/users/${userId}/orders`)
    dispatch(getAllOrders(orders))
  } catch (error) {
    console.log(error)
  }
}
export const fetchAddedItem = (userId, orderId, item) => {
  return async dispatch => {
    try {
      const {data: updatedOrder} = await axios.post(
        `/api/users/${userId}/orders/${orderId}/celebrities`,
        item
      )
      console.log(updatedOrder)
      dispatch(addItem(updatedOrder))
    } catch (error) {
      console.log(error)
    }
  }
}
export const fetchWithoutDeletedItem = (userId, orderId, celebrityId) => {
  return async dispatch => {
    try {
      const {data: updatedOrder} = await axios.delete(
        `/api/users/${userId}/orders/${orderId}/celebrities/${celebrityId}`
      )
      dispatch(deleteItem(updatedOrder))
    } catch (error) {
      console.log(error)
    }
  }
}
export const fetchWithUpdatedQuantity = (
  userId,
  orderId,
  quantity,
  celebrityId
) => {
  return async dispatch => {
    try {
      const body = {
        updates: {quantity: quantity},
        celebrityId
      }
      const {data: updatedOrder} = await axios.put(
        `/api/users/${userId}/orders/${orderId}/celebrities`,
        body
      )
      dispatch(updateQuantity(updatedOrder))
    } catch (error) {
      console.log(error)
    }
  }
}
export const postCompletedOrder = (user, orderId) => {
  return async dispatch => {
    const updates = {status: 'Completed'}
    const {data: newOrder} = await axios.put(
      `/api/users/${user.id}/orders/${orderId}`,
      updates
    )
    dispatch(checkoutCurrentOrder(newOrder))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.orders,
        currentOrder: action.orders.filter(
          order => order.status === 'Pending'
        )[0]
      }
    case ADD_ITEM:
      return {
        ...state,
        currentOrder: action.order,
        orders: state.orders
          .filter(elem => elem.status === 'Completed')
          .concat(action.order)
      }
    case UPDATE_QUANTITY:
      return {
        ...state,
        currentOrder: action.order,
        orders: state.orders
          .filter(elem => elem.status === 'Completed')
          .concat(action.order)
      }
    case DELETE_ITEM:
      return {
        ...state,
        currentOrder: action.order,
        orders: state.orders
          .filter(elem => elem.status === 'Completed')
          .concat(action.order)
      }
    case CHECKOUT_CURRENT_ORDER:
      return {...state, currentOrder: action.order}
    case CLEAR_ORDERS:
      return {...state, orders: [], currentOrder: {}}
    default:
      return state
  }
}
