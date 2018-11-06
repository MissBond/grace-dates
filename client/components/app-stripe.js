import React, {Component} from 'react'
import Checkout from './checkout'
import CheckoutForm from './checkoutForm'
import {connect} from 'react-redux'
import CheckoutLogin from './checkoutConfirmLogin'
import {fetchUpdatedOrder} from '../store/orders'

class AppStripe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderTotal: 0,
      orderTotalWithPromo: 0,
      orderObject: {}
    }
    this.setOrderTotal = this.setOrderTotal.bind(this)
    this.setOrderTotalWithPromo = this.setOrderTotalWithPromo.bind(this)
    this.setOrderObject = this.setOrderObject.bind(this)
  }

  setOrderTotal(orderTotal) {
    this.setState({orderTotal})
  }

  setOrderTotalWithPromo(orderTotalWithPromo) {
    this.setState({orderTotalWithPromo})
  }

  setOrderObject(orderObject) {
    this.setState({orderObject})
  }

  render() {
    console.log('app stripe state', this.props)
    return !this.props.userId ? (
      <CheckoutLogin />
    ) : (
      <div className="example">
        <h1>Checkout</h1>
        <CheckoutForm
          setOrderTotal={this.setOrderTotal}
          setOrderTotalWithPromo={this.setOrderTotalWithPromo}
          setOrderObject={this.setOrderObject}
        />
        <div id='checkout' onClick={() => this.props.fetchUpdatedOrder(this.props.userId, this.state.orderObject)}>
        <Checkout
          name={'Enter Payment Information'}
          // description={'Only the Book'}
          amount={
            this.state.orderTotalWithPromo > 0
              ? this.state.orderTotalWithPromo
              : this.state.orderTotal
          }
        />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUpdatedOrder: (userId, orderObject) => dispatch(fetchUpdatedOrder(userId, orderObject))
})

const mapStateToProps = state => {
  return {
    currentOrder: state.orders.currentOrder,
    userId: state.user.id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppStripe)
