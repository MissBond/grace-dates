import axios from 'axios'

//initial state
const initialState = {
  currentOrder: {},
  orders: []
}

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const UPDATE_CURRENT_ORDER = 'UPDATE_CURRENT_ORDER'
const CHECKOUT_CURRENT_ORDER = 'CHECKOUT_CURRENT_ORDER'

export const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})
export const updateCurrentOrder = order => ({type: UPDATE_CURRENT_ORDER, order})
export const checkoutCurrentOrder = order => ({
  type: CHECKOUT_CURRENT_ORDER,
  order
})

export const fetchAllOrders = user => async dispatch => {
  try {
    const {data: orders} = await axios.get(`/api/users/${user.id}/orders`)
    dispatch(getAllOrders(orders))
  } catch (error) {
    console.log(error)
  }
}
export const fetchUpdatedOrder = (user, updates, orderId) => {
    //updates should have orderId, productId, and quantity
  return async dispatch => {
    const {data: updatedOrder} = await axios.put(
      `/api/users/${user.id}/orders/${orderId}/celebrities`,
      updates
    )
    dispatch(updateCurrentOrder(updatedOrder))
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
        currentOrder: action.orders.filter(order => order.status === 'Pending')
      }
    case UPDATE_CURRENT_ORDER:
      return {...state, currentOrder: action.order} //may need to update orders array here
    case CHECKOUT_CURRENT_ORDER:
      return {...state, currentOrder: action.order}
    default:
      return state
  }
}
