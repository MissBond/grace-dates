import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../store/orders'
import UpdateUserForm from './updateUser'
import {me} from '../store'
import moment from 'moment'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

class UserHome extends React.Component {
  componentDidUpdate() {
    if (!this.props.orders.length) {
      this.props.fetchOrders(this.props.userId)
    }
  }
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchOrders(this.props.userId)
  }
  calculatePricePerMin(netWorth) {
    const minsPerYr = 525600
    return (netWorth * 100000 / minsPerYr).toFixed(2)
  }
  render() {
    const cart = this.props.orders.filter(order => order.status === 'Pending')
    const orderHistory = this.props.orders.filter(
      order => order.status !== 'Pending'
    )
    return (
      <div>
        <div>
          <h3>Welcome, {this.props.email}</h3>
        </div>
        <div>
          <h3>Current Cart:</h3>
          {cart.length === 0 ? (
            <div>Fetching Data</div>
          ) : cart[0].celebrities.length === 0 ? (
            <div>No Items in Cart</div>
          ) : (
            <div>
              Cart Total: ${cart[0].celebrities.reduce((acc, celebrity) => {
                return (
                  acc +
                  +(
                    +`${celebrity.celebrityOrder.quantity}` *
                    +this.calculatePricePerMin(celebrity.netWorthMillions)
                  )
                )
              }, 0)}
              <ol>
                {cart[0].celebrities.map(celebrity => (
                  <div key={celebrity.id}>
                    <li>
                      <p>
                        Celebrity: {celebrity.firstName} {celebrity.lastName}
                      </p>
                      <p>Quantity: {celebrity.celebrityOrder.quantity}</p>
                      <p>
                        Item Subtotal:{' '}$
                        {+`${celebrity.celebrityOrder.quantity}` *
                          +this.calculatePricePerMin(
                            celebrity.netWorthMillions
                          )}
                      </p>
                    </li>
                  </div>
                ))}
              </ol>
            </div>
          )}
        </div>
        <div>
          <h3>Order History:</h3>
          {orderHistory.length === 0 ? (
            <div>No Order History</div>
          ) : (
            <ol>
              {orderHistory.map(order => (
                <div key={order.id}>
                  <li>
                    <p>Order Number: {order.id}</p>
                    <p>Order Status: {order.status}</p>
                    <p>
                      Order Date:{' '}
                      {moment(order.updatedAt).format('MMM Do YYYY')}
                    </p>
                    <p>Order Total: ${+order.orderCost / 100}</p>
                    <p>Items: </p>
                    {order.celebrities.map(celebrity => {
                      return (
                        <div key={celebrity.id}>
                          <p>
                            Celebrity: {celebrity.firstName} {celebrity.lastName}
                          </p>
                          <p>Quantity: {celebrity.celebrityOrder.quantity}</p>
                          <p>
                            Item Subtotal: ${+celebrity.celebrityOrder
                              .totalPurchasePrice / 100}
                          </p>
                          <p>
                            <Link to={`/celebrities/${celebrity.id}`}>
                              Celebrity Information
                            </Link>
                          </p>
                        </div>
                      )
                    })}
                  </li>
                </div>
              ))}
            </ol>
          )}
        </div>
        <div>
          <h3>Update Information:</h3>
          <UpdateUserForm userId={this.props.userId} />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    userId: state.user.id,
    orders: state.orders.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (userId, currentCart) => dispatch(fetchAllOrders(userId)),
    loadInitialData: () => dispatch(me())
  }
}
export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
