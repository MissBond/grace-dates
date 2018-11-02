import axios from 'axios'

//initial state
const initialState = {
  currentOrder: {},
  orders: []
}

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const CHECKOUT_CURRENT_ORDER = 'CHECKOUT_CURRENT_ORDER'
const CLEAR_ORDERS = 'CLEAR_ORDERS'

export const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})
export const addItem = order => ({type: ADD_ITEM, order})
export const deleteItem = order => ({type: DELETE_ITEM, order})
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
      dispatch(addItem(updatedOrder))
    } catch (error) {
      console.log(error)
    }
  }
}
export const fetchDeletedItem = (userId, orderId, item) => {
  return async dispatch => {
    try {
      const {data: updatedOrder} = await axios.delete(
        `/api/users/${userId}/orders/${orderId}/celebrities`,
        item
      )
      dispatch(deleteItem(updatedOrder))
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
      return {...state, currentOrder: action.order} //may need to update orders array here
    case CHECKOUT_CURRENT_ORDER:
      return {...state, currentOrder: action.order}
    case CLEAR_ORDERS:
      return {...state, orders: [], currentOrder: {}}
    default:
      return state
  }
}
