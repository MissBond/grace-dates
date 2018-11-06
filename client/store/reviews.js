import axios from 'axios'

const initialState = {
    reviews: []
}

const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'


export const addReview = (review) => ({type: ADD_REVIEW, review})
export const getAllReviews = (reviews) => ({type: GET_ALL_REVIEWS, reviews})

export const fetchReviews = (celebrityId) =>  async (dispatch) => {
    try {
        const { data: reviews } = await axios.get(`/api/celebrities/${celebrityId}/reviews`)
        dispatch(getAllReviews(reviews))
    } catch (error) {
        console.log('whoopsies, something went wrong fetching all reviews')
    }
}

export const postReview = (userId, celebrityId, header, rating, description) => async (dispatch) => {
    const review = {userId, celebrityId, header, rating, description}
    try {
        const { data: newReview } = await axios.post(`/api/celebrities/${celebrityId}/reviews`, review)
        dispatch(addReview(newReview))
    } catch (error) {
        console.log('whoopsies, something went wrong posting a new review')
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_REVIEW: 
            return {...state, reviews: [...state.reviews, action.review]}
        case GET_ALL_REVIEWS:
            return {...state, reviews: action.reviews}
        default: 
            return state;
    }
}