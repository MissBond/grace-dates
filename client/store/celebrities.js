import axios from 'axios'

//initial state
const initialState = {
  celebrities: []
}

//action types
const GET_ALL_CELEBRITIES = 'GET_ALL_CELEBRITIES'
const ADD_ONE_CELEBRITY = 'ADD_ONE_CELEBRITY'
const SET_FILTER = 'SET_FILTER'

//action creators
export const getAllCelebrities = celebrities => ({
  type: GET_ALL_CELEBRITIES,
  celebrities
})
export const addedOneCelebrity = oneCelebrity => ({
  type: ADD_ONE_CELEBRITY,
  oneCelebrity
})

//async action creators
export const fetchAllCelebrities = () => async dispatch => {
  try {
    const {data: celebrities} = await axios.get('/api/celebrities')
    dispatch(getAllCelebrities(celebrities))
  } catch (error) {
    console.log('whoopsies, something went wrong fetching all celebrities')
  }
}

export const postOneCelebrity = celebrity => async dispatch => {
  try {
    const {data: oneCelebrity} = await axios.post('/api/celebrities', celebrity)
    dispatch(addedOneCelebrity(oneCelebrity))
  } catch (error) {
    console.log('whoopsies, something went wrong posting a celebrity')
  }
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CELEBRITIES:
      return {...state, celebrities: action.celebrities}
    case ADD_ONE_CELEBRITY:
      return {
        ...state,
        celebrities: [...state.celebrities, action.oneCelebrity]
      }
    default: {
      return state
    }
  }
}
