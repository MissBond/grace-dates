import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PROMOCODES = 'GET_PROMOCODES'
const GET_PROMOCODE = 'GET_PROMOCODE'

/**
 * INITIAL STATE
 */
const initialState = {
  promoCodes: [],  
  selectedPromoCode: {}
}

/**
 * ACTION CREATORS
 */
export const getAllPromoCodes = promoCodes => ({type: GET_ALL_PROMOCODES, promoCodes})
export const getPromoCode = promoCode => ({type: GET_PROMOCODE, promoCode})

/**
 * THUNK CREATORS
 */
export const fetchAllPromoCodes = () => {
    return async dispatch => {
        const {data} = await axios.get('/api/promoCodes')
        dispatch(getAllPromoCodes(data))
    }
}
export const fetchPromoCode = promoCodeId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/promoCodes/${promoCodeId}`)
    dispatch(getPromoCode(data))
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PROMOCODES:
      return {...state, promoCodes: action.promoCodes}
    case GET_PROMOCODE:
      return {...state, selectedPromoCode: action.promoCode}
    default:
      return state
  }
}
