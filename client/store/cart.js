const initialState = {
  cart: []
}

//action types

const ADD_TO_CART = 'ADD_TO_CART'

//action creators

const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

// thunk creator

export const 