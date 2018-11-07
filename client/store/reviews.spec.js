/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {
  fetchReviews,
  postReview
} from './reviews'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    reviews: []
}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchReviews', () => {
    it('eventually dispatches the GET ALL REVIEWS action', async () => {
      mockAxios.onGet('/api/celebrities/1/reviews').replyOnce(200)
      await store.dispatch(fetchReviews(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_REVIEWS')
    })
  })

  describe('postReview', () => {
    it.skip('eventually dispatches the ADD REVIEW action', async () => {
      mockAxios.onPost('/api/celebrities/1/reviews').replyOnce(204)
      let newReview = {
        userId: 1,
        celebrityId: 1,
        header: 'Test',
        rating: 3,
        description: 'Test description'
      }
      await store.dispatch(
        postReview(newReview)
      )
      const actions = store.getActions()
      console.log(actions)
      expect(actions[0].type).to.be.equal('ADD_REVIEW')
    })
  })
})
