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
  constructor(props) {
    super(props)
    this.state = {
      orders: []
    }
  }
  async componentDidUpdate() {
    if (!this.props.orders.length && this.state.orders.length) {
      const orders = await this.props.fetchOrders(this.props.userId)
      this.setState({orders})
    }
  }
  async componentDidMount() {
    this.props.loadInitialData()
    const orders = await this.props.fetchOrders(this.props.userId)
    this.setState({orders})
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
        <div className="user-page">
        <div>
          <h2 className="user-welcome-heading">Welcome, {this.props.email}</h2>
        </div>
        <div>
          <h4 id="user-page-heading">Current Cart:</h4>
          {cart.length === 0 ? (
            <div>Fetching Data</div>
          ) : cart[0].celebrities.length === 0 ? (
            <div>No Items in Cart</div>
          ) : (
            <div>
              Cart Total: ${cart[0].celebrities
                .reduce((acc, celebrity) => {
                  return (
                    acc +
                    +(
                      +`${celebrity.celebrityOrder.quantity}` *
                      +this.calculatePricePerMin(celebrity.netWorthMillions)
                    )
                  )
                }, 0)
                .toFixed(2)}

              <ol className="user-page-cart-items">
                {cart[0].celebrities.map(celebrity => (
                  <div key={celebrity.id}>
                    <li>
                      <p>
                        Celebrity: {celebrity.firstName} {celebrity.lastName}
                      </p>
                      <p>Quantity: {celebrity.celebrityOrder.quantity}</p>
                      <p>
                        Item Subtotal: $
                        
                        {(+`${celebrity.celebrityOrder.quantity}` *
                          +this.calculatePricePerMin(
                            celebrity.netWorthMillions
                          )).toFixed(2)}
                      </p>
                    </li>
                  </div>
                ))}
              </ol>
            </div>
          )}
        </div>
        <div>
        <h4 id="user-page-heading">Order History:</h4>
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
                            Celebrity: {celebrity.firstName}{' '}
                            {celebrity.lastName}
                          </p>
                          <p>Quantity: {celebrity.celebrityOrder.quantity}</p>
                          <p>
                            Item Subtotal: ${
                              +celebrity.celebrityOrder
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
        <h4 id="user-page-heading">Update Information:</h4>
          <UpdateUserForm user={this.props.user} />
        </div>
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
    orders: state.orders.orders,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: userId => dispatch(fetchAllOrders(userId)),
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
