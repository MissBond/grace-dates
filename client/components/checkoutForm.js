import React, {Component} from 'react'
import PromoCode from './promoCode'
import {connect} from 'react-redux'
import axios from 'axios'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      orderTotal: 0,
      orderTotalWithPromo: 0,
      promoCodes: [],
      selectedPromoCode: {},
      validPromo: true,
      orderObject: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePromoCodeSubmit = this.handlePromoCodeSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePromoCodeSubmit(event, promoCode) {
    event.preventDefault()
    const selectedPromoCode = this.state.promoCodes.filter(
      promo => promo.code === promoCode
    )[0]
    if (selectedPromoCode) {
      const orderTotalWithPromo =
        this.state.orderTotal * (1 - selectedPromoCode.discountPercentage / 100)
      const orderObject = {
        type: 'Checkout',
        orderId: this.props.currentOrder.id,
        promoCode: {
          id: selectedPromoCode.id,
          discountPercentage: selectedPromoCode.discountPercentage
        },
        orderUpdates: {
          status: 'Completed',
          orderCost: (orderTotalWithPromo*100)
        },
        celebrities: this.props.currentOrder.celebrities
      }
      this.setState({
        orderTotalWithPromo,
        selectedPromoCode: selectedPromoCode,
        validPromo: true,
        orderObject
      })
      this.props.setOrderTotalWithPromo(
        this.state.orderTotal * (1 - selectedPromoCode.discountPercentage / 100)
      )
      this.props.setOrderObject(orderObject)
    } else {
      this.setState({
        validPromo: false
      })
    }
  }

  calculateOrderTotal(cart) {
    return cart.reduce((acc, celebrity) => {
      const celebrityQuantity = +celebrity.celebrityOrder.quantity
      const celebrityPrice = +this.calculatePricePerMin(
        celebrity.netWorthMillions
      )
      return acc + celebrityQuantity * celebrityPrice
    }, 0)
  }

  calculatePricePerMin(netWorth) {
    const minsPerYr = 525600
    return (netWorth * 100000 / minsPerYr).toFixed(2)
  }

  componentDidMount = async () => {
    const {data: promoCodes} = await axios.get('/api/promoCodes')
    const orderTotal = this.calculateOrderTotal(
      this.props.currentOrder.celebrities
    )
    const orderObject = {
      type: 'Checkout',
      orderId: this.props.currentOrder.id,
      orderUpdates: {
        status: 'Completed',
        orderCost: (orderTotal*100)
      },
      celebrities: this.props.currentOrder.celebrities
    }
    this.setState({
      promoCodes,
      orderTotal,
      orderObject
    })
    this.props.setOrderTotal(
      this.calculateOrderTotal(this.props.currentOrder.celebrities)
    )
    this.props.setOrderObject(orderObject)
  }

  render() {
    return (
      <div className="checkout">
        <h3>Hurry and complete your payment! Your celeb date can't wait!</h3>
        <form>
          <div className="checkout-total">
            Order Total: ${this.state.orderTotal}
          </div>
        </form>
        <div>
          <PromoCode handleSubmit={this.handlePromoCodeSubmit} />
        </div>
        {this.state.validPromo === false && <div>Invalid promo code!</div>}
        {this.state.selectedPromoCode.id && (
          <div>Total with Promo Code: ${this.state.orderTotalWithPromo}</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentOrder: state.orders.currentOrder,
    userId: state.user.id
  }
}

export default connect(mapStateToProps)(CheckoutForm)
