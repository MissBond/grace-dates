import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../store/orders'
import UpdateUserForm from './updateUser'

/**
 * COMPONENT
 */

class UserHome extends React.Component {
  // componentDidUpdate(prevProps) {
  //   if(prevProps.orders )
  // }

  componentDidMount() {
    this.props.fetchOrders(this.props.userId)
  }
  render() {
    const cart = this.props.orders.filter(order => order.status === 'Pending')
    const orderHistory = this.props.orders.filter(
      order => order.status === 'Completed'
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
            cart[0].celebrities.map(item => (
              <div key={item.id}>
                Item: {item.firstName} {item.lastName}  Quantity: {item.celebrityOrder.quantity}
              </div>
            ))
          )}
        </div>
        <div>
          <h3>Order History:</h3>
          {orderHistory.length === 0 ? (
            <div>No Order History</div>
          ) : (
            orderHistory.map(order => (
              <div key={order.id}>Order Id: {order.id}</div>
            ))
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
    fetchOrders: userId => dispatch(fetchAllOrders(userId))
  }
}
export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
