import axios from 'axios'

const initialState = {
    reviews: []
}

const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'


export const addReview = (review) => ({type: ADD_REVIEW, review})
export const getAllReviews = (reviews) => ({type: GET_ALL_REVIEWS, reviews})

export const fetchReviews = () =>  async (dispatch) => {
    try {
        const { data: reviews } = await axios.get('/api/reviews')
        dispatch(getAllReviews(reviews))
    }
}

export const postReview = (review) => async (dispatch) => {
    try {
        const { data: newReview } = await axios.post('/api/reviews', review)
        dispatch(addReview(newReview))
    } catch (error) {
        console.log('whoopsies, something went wrong posting a new review')
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_REVIEW: 
            return {...state, reviews: [...state.reviews, action.review]}
        default: 
            return state;
    }
}