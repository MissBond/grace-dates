/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {
  fetchCelebrity,
  updateSelectedCelebrity,
  removeSelectedCelebrity
} from './single-celebrity'
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
    oneCelebrity: {}
  }
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchCelebrity', () => {
    it('eventually dispatches the GET CELEBRITY action', async () => {
      mockAxios.onGet('/api/celebrities/1').replyOnce(200)
      await store.dispatch(fetchCelebrity(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CELEBRITY')
    })
  })

  describe('updateSelectedCelebrity', () => {
    it('eventually dispatches the UPDATE CELEBRITY action', async () => {
      mockAxios.onPut('/api/celebrities/1').replyOnce(204)
      const updatedCeleb = {
        id: 1,
        firstName: 'John',
        lastName: 'Stamos',
        imageUrl:
          'https://starsinformer.com/wp-content/uploads/2017/10/576f9e7747b2d90ab2cf83574b8f93aa.jpg',
        occupation: 'Actor',
        gender: 'Male',
        age: 40,
        description: 'Test updated description'
      }
      await store.dispatch(
        updateSelectedCelebrity(updatedCeleb, updatedCeleb.id)
      )
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATE_CELEBRITY')
    })
  })

  describe('removeSelectedCelebrity', () => {
    it('eventually dispatches the REMOVE CELEBRITY action', async () => {
      mockAxios.onDelete('/api/celebrities/1').replyOnce(204)
      await store.dispatch(removeSelectedCelebrity(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_CELEBRITY')
    })
  })
})
