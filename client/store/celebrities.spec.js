/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchAllCelebrities, postOneCelebrity} from './celebrities'
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
    visibilityFilter: 'All',
    celebrities: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchAllCelebrities', () => {
    it('eventually dispatches the GET ALL CELEBRITIES action', async () => {
      mockAxios.onGet('/api/celebrities').replyOnce(200)
      await store.dispatch(fetchAllCelebrities())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_CELEBRITIES')
    })
  })

  describe('postOneCelebrity', () => {
    it('eventually dispatches the ADD ONE CELEBRITY action', async () => {
      mockAxios.onPost('/api/celebrities').replyOnce(200)
      const newCeleb = {
        id: 100,
        firstName: 'Test',
        lastName: 'Test',
        imageUrl:
          'https://starsinformer.com/wp-content/uploads/2017/10/576f9e7747b2d90ab2cf83574b8f93aa.jpg',
        occupation: 'Test',
        gender: 'Male',
        age: 100,
        description: 'Test updated description'
      }

      await store.dispatch(postOneCelebrity(newCeleb))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_ONE_CELEBRITY')
    })
  })
})
