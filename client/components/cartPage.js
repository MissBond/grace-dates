import React from 'react'
// import CheckoutForm from './checkoutForm';
import AppStripe from './app-stripe'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddCart from './addCart'
import {
  fetchWithUpdatedQuantity,
  fetchWithoutDeletedItem
} from '../store/orders'
import PromoCode from './promoCode'
import axios from 'axios'

class CartPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: this.props.userId ? this.props.currentOrder.celebrities : [],
      quantities: {},
      promoCodes: [],
      selectedPromoCode: {},
      validPromo: true
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleUpdateClick = this.handleUpdateClick.bind(this)
    this.handleUpdateClickThunk = this.handleUpdateClickThunk.bind(this)
    this.handlePromoCodeSubmit = this.handlePromoCodeSubmit.bind(this)
  }

  calculatePricePerMin(netWorth) {
    const minsPerYr = 525600
    return (netWorth * 100000 / minsPerYr).toFixed(2)
  }

  handlePromoCodeSubmit(event, promoCode) {
    event.preventDefault()
    console.log(this.state.promoCodes)
    const selectedPromoCode = this.state.promoCodes.filter(
      promo => promo.code === promoCode
    )[0]
    if (selectedPromoCode) {
      this.setState({
        selectedPromoCode: selectedPromoCode,
        validPromo: true
      })
    } else {
      this.setState({
        validPromo: false
      })
    }
  }

  handleClick(celebrity) {
    let {cart, quantities} = this.state
    if (this.props.userId) {
      this.props.deleteItem(
        this.props.userId,
        this.props.currentOrder.id,
        celebrity.id
      )
    } else {
      let newCart = cart.filter(elem => elem.id !== celebrity.id)
      localStorage.setItem('cart', JSON.stringify(newCart))
      let newQuantities = Object.assign({}, quantities)
      delete newQuantities[celebrity.id]
      localStorage.setItem('quantities', JSON.stringify(newQuantities))
      this.setState({
        cart: newCart,
        quantities: newQuantities
      })
    }
  }

  componentDidMount = async () => {
    const {data: promoCodes} = await axios.get('/api/promoCodes')
    this.setState({
      promoCodes: promoCodes
    })
    this.props.userId
      ? this.setState({
          cart: this.props.currentOrder.celebrities
        })
      : JSON.parse(localStorage.getItem('cart'))
        ? this.setState({
            cart: JSON.parse(localStorage.getItem('cart')),
            quantities: JSON.parse(localStorage.getItem('quantities'))
          })
        : this.setState({
            cart: []
          })
  }

  //this was an attempt to synchronously update UI for user workflow
  //currently causes an infinite loop
  //current app behavior: updates to the cart from the cart page are reflected in store, but not state

  componentDidUpdate(prevState) {
    if (prevState.currentOrder.celebrities !== this.props.currentOrder.celebrities) {
      this.setState({
        cart: this.props.currentOrder.celebrities
      })
    }
  }

  handleUpdateClick(celebrityId, newQuantity) {
    let currentQuantities = {...this.state.quantities}
    currentQuantities[celebrityId] = newQuantity
    localStorage.setItem('quantities', JSON.stringify(currentQuantities))
    this.setState({
      quantities: currentQuantities
    })
  }

  handleUpdateClickThunk(userId, orderId, quantity, celebrityId) {
    this.props.updateQuantity(userId, orderId, quantity, celebrityId)
    // this.setState({
    //   cart: this.props.currentOrder.celebrities
    // })
  }

  render() {
    console.log(this.state)
    let {cart, quantities} = this.state
    return cart.length ? (
      <div>
        <ol>
          {cart.map((celebrity, i) => (
            // !this.props.userId ?
            // quantities[celebrity.id] && (
            <div key={i}>
              <li key={celebrity.id}>
                <Link to={`/celebrities/${celebrity.id}`}>{`${
                  celebrity.firstName
                } ${celebrity.lastName}`}</Link>
                <br />
                Occupation: {`${celebrity.occupation}`}
                <br />
                Quantity:{' '}
                {celebrity.celebrityOrder
                  ? `${celebrity.celebrityOrder.quantity}`
                  : quantities[celebrity.id]}
                <br />
                Subtotal: ${(+(celebrity.celebrityOrder
                  ? `${celebrity.celebrityOrder.quantity}`
                  : +quantities[celebrity.id]) *
                  +this.calculatePricePerMin(celebrity.netWorthMillions)).toFixed(2)}
                <div>
                  <AddCart
                    quantities={quantities[celebrity.id]}
                    userId={this.props.userId}
                    addType="Update Quantity"
                    celebrityId={celebrity.id}
                    orderId={this.props.currentOrder.id}
                    currentQuantity={
                      this.props.userId ? celebrity.celebrityOrder.quantity : 1
                    }
                    handleUpdateClick={this.handleUpdateClick}
                    handleUpdateClickThunk={this.handleUpdateClickThunk}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      this.handleClick(celebrity)
                    }}
                  >
                    Delete from Cart
                  </button>
                </div>
                <br />
                <img src={celebrity.imageUrl} />
              </li>
              <br />
            </div>
          ))}
        </ol>
        <div>
          Total: ${cart.reduce((acc, celebrity) => {
            return (
              acc +
              +(celebrity.celebrityOrder
                ? `${celebrity.celebrityOrder.quantity}`
                : quantities[celebrity.id]) * 100 *
                +this.calculatePricePerMin(celebrity.netWorthMillions) / 100
            )
          }, 0).toFixed(2)}
        </div>
        <div>
          <PromoCode handleSubmit={this.handlePromoCodeSubmit} />
        </div>
        {this.state.validPromo === false && <div>Invalid promo code!</div>}
        {this.state.selectedPromoCode.id && (
          <div>
            Total with Promo Code: ${cart.reduce((acc, celebrity) => {
              return (
                acc +
                +(celebrity.celebrityOrder
                  ? `${celebrity.celebrityOrder.quantity}`
                  : quantities[celebrity.id]) *
                  +this.calculatePricePerMin(celebrity.netWorthMillions)
              )
            }, 0) *
              (1-(+this.state.selectedPromoCode.discountPercentage / 100))}
          </div>
        )}
        <div>
          <Link to="/checkout">
            <button onClick={() => <AppStripe />} type="button">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    ) : (
      <div>
        <h3>It looks like your cart is empty!</h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentOrder: state.orders.currentOrder,
    userId: state.user.id,
    promoCodes: state.promoCodes.promoCodes,
    selectedPromoCode: state.promoCodes.selectedPromoCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateQuantity: (userId, orderId, quantity, celebrityId) =>
      dispatch(
        fetchWithUpdatedQuantity(userId, orderId, quantity, celebrityId)
      ),
    deleteItem: (userId, orderId, celebrityId) =>
      dispatch(fetchWithoutDeletedItem(userId, orderId, celebrityId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
