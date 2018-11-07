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
const UPDATE_ORDER = 'UPDATE_ORDER'
const CLEAR_ORDERS = 'CLEAR_ORDERS'

export const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})
export const addItem = order => ({type: ADD_ITEM, order})
export const deleteItem = order => ({type: DELETE_ITEM, order})
export const updateQuantity = order => ({type: UPDATE_QUANTITY, order})
export const updateOrder = (updatedOrder, cart) => ({
  type: UPDATE_ORDER,
  updatedOrder,
  cart
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
        quantity
      }
      const {data: updatedOrder} = await axios.put(
        `/api/users/${userId}/orders/${orderId}/celebrities/${celebrityId}`,
        body
      )
      dispatch(updateQuantity(updatedOrder))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchUpdatedOrder = (userId, orderObj) => {
  return async dispatch => {
    const {data} = await axios.put(
      `/api/users/${userId}/orders/${orderObj.orderId}`,
      orderObj
    )
    const updatedOrder = data.updatedOrder
    const cart = data.cart ? data.cart : initialState.currentOrder
    dispatch(updateOrder(updatedOrder, cart))
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
          .filter(elem => elem.status !== 'Pending')
          .concat(action.order)
      }
    case UPDATE_QUANTITY:
      return {
        ...state,
        currentOrder: action.order,
        orders: state.orders
          .filter(elem => elem.status !== 'Pending')
          .concat(action.order)
      }
    case DELETE_ITEM:
      return {
        ...state,
        currentOrder: action.order,
        orders: state.orders
          .filter(elem => elem.status !== 'Pending')
          .concat(action.order)
      }
    case UPDATE_ORDER:
      return {
        ...state,
        currentOrder: action.cart,
        order: state.orders
          .filter(order => order.id !== action.updatedOrder.id && order.status !== 'Pending')
          .concat(action.updatedOrder, action.cart)
      }
    case CLEAR_ORDERS:
      return {...state, orders: [], currentOrder: {}}
    default:
      return state
  }
}
