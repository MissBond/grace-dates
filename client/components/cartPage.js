import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CheckoutForm from './checkoutForm'
import AddCart from './addCart'
import {
  fetchWithUpdatedQuantity,
  fetchWithoutDeletedItem
} from '../store/orders'

class CartPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: this.props.userId ? this.props.currentOrder.celebrities : [],
      quantities: {}
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleUpdateClick = this.handleUpdateClick.bind(this)
    this.handleUpdateClickThunk = this.handleUpdateClickThunk.bind(this)
  }

  calculatePricePerMin(netWorth) {
    const minsPerYr = 525600
    return (netWorth * 100000 / minsPerYr).toFixed(2)
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
        quantities: newQuantities})
    }
  }

  componentDidMount() {
    this.props.userId
      ? this.setState({
          cart: this.props.currentOrder.celebrities
        })
      : this.setState({
          cart: JSON.parse(localStorage.getItem('cart')),
          quantities: JSON.parse(localStorage.getItem('quantities'))
        })
  }

  //this was an attempt to synchronously update UI for user workflow
  //currently causes an infinite loop
  //current app behavior: updates to the cart from the cart page are reflected in store, but not state

  // componentDidUpdate(prevState) {
  //   if (prevState.cart !== this.state.cart) {
  //     this.props.userId ?
  //     this.setState({
  //       cart: this.props.currentOrder.celebrities
  //     })
  //     : this.setState({
  //       cart: JSON.parse(localStorage.getItem('cart')),
  //       quantities: JSON.parse(localStorage.getItem('quantities'))
  //     })
  //   }
  // }


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
    let {cart, quantities} = this.state
    return (
      cart.length ?
        (<div>
          <ol>
            {cart.map(
              (celebrity, i) =>
                // !this.props.userId ?
                // quantities[celebrity.id] && (
                  (
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
                      Subtotal: ${+(celebrity.celebrityOrder
                        ? `${celebrity.celebrityOrder.quantity}`
                        : +quantities[celebrity.id]) *
                        +this.calculatePricePerMin(celebrity.netWorthMillions)}
                      <div>
                        <AddCart
                          quantities={quantities[celebrity.id]}
                          userId={this.props.userId}
                          addType="Update Quantity"
                          // updateQuantity={this.props.updateQuantity}
                          celebrityId={celebrity.id}
                          orderId={this.props.currentOrder.id}
                          currentQuantity={
                            this.props.userId
                              ? celebrity.celebrityOrder.quantity
                              : 1
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
                )
            )}
          </ol>
          <div>
            Total: ${cart.reduce((acc, celebrity) => {
              return (
                acc +
                +(celebrity.celebrityOrder
                  ? `${celebrity.celebrityOrder.quantity}`
                  : quantities[celebrity.id]) *
                  +this.calculatePricePerMin(celebrity.netWorthMillions)
              )
            }, 0)}
          </div>
          <Link to="/checkout">
            <button onClick={() => <CheckoutForm />} type="button">
              Checkout
            </button>
          </Link>
        </div>
      )
      : null
    )
  }
}

const mapStateToProps = state => {
  return {
    currentOrder: state.orders.currentOrder,
    userId: state.user.id
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
