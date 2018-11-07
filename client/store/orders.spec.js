/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {
  fetchAllOrders
} from './orders'
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
    currentOrder: {},
    orders: []
    }
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchAllOrders', () => {
    it('eventually dispatches the GET ALL ORDERS action', async () => {
      mockAxios.onGet('/api/users/1/orders').replyOnce(200)
      await store.dispatch(fetchAllOrders(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_ORDERS')
    })
  })
})
