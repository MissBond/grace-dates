import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CELEBRITY = 'GET_CELEBRITY'
const UPDATE_CELEBRITY = 'UPDATE_CELEBRITY'
const REMOVE_CELEBRITY = 'REMOVE_CELEBRITY'

/**
 * INITIAL STATE
 */
const initialState = {
  oneCelebrity: {}
}
// const defaultCelebrity = {}

/**
 * ACTION CREATORS
 */
export const getCelebrity = celebrity => ({type: GET_CELEBRITY, celebrity})
export const updateCelebrity = updatedCelebrity => ({
  type: UPDATE_CELEBRITY,
  updatedCelebrity
})
export const removeCelebrity = celebrityId => ({type: REMOVE_CELEBRITY, celebrityId})

/**
 * THUNK CREATORS
 */
export const fetchCelebrity = celebrityId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/celebrities/${celebrityId}`)
    dispatch(getCelebrity(data))
  }
}

export const updateSelectedCelebrity = (celebrity, celebrityId) => {
    return async dispatch => {
        const updatedCelebrity = await axios.put(`/api/celebrities/${celebrityId}`, celebrity)
        dispatch(updateCelebrity(updatedCelebrity.data))
    }
}

export const removeSelectedCelebrity = celebrityId => {
    return async dispatch => {
        await axios.delete(`/api/celebrities/${celebrityId}`)
        dispatch(removeCelebrity(celebrityId))
    }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CELEBRITY: 
      return {...state, oneCelebrity: action.celebrity}
    case UPDATE_CELEBRITY: 
      return {...state, oneCelebrity: action.updatedCelebrity}
    case REMOVE_CELEBRITY: 
      return {...state, oneCelebrity: null}
    default:
      return state
  }
}
