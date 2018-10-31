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
const defaultCelebrity = {}

/**
 * ACTION CREATORS
 */
const getCelebrity = celebrity => ({type: GET_CELEBRITY, celebrity})
const updateCelebrity = updatedCelebrity => ({
  type: UPDATE_CELEBRITY,
  updatedCelebrity
})
const removeCelebrity = celebrityId => ({type: REMOVE_CELEBRITY, celebrityId})

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
export default function(state = defaultCelebrity, action) {
  switch (action.type) {
    case GET_CELEBRITY:
      return action.celebrity
    case UPDATE_CELEBRITY:
        return action.updatedCelebrity //this is a placeholder, we will need to update the list of celebrities in the store (i.e. update information by matching on id)
    case REMOVE_CELEBRITY:
      return defaultCelebrity //this is a placeholder, we will need to update the list of celebrities in the store (i.e. delete celebrity by matching on id)
    default:
      return state
  }
}
