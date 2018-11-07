import React from 'react'
import {connect} from 'react-redux'
import UpdateCelebrity from './updateCelebrity'
import {fetchCelebrity, removeSelectedCelebrity} from '../store'
import Reviews from './reviews'
import AddCart from './addCart'
import {fetchAddedItem} from '../store/orders'

class SingleCelebrity extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: [],
      quantities: {},
      update: false
    }
    this.populateLocalStorage = this.populateLocalStorage.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    this.populateLocalStorage()
    const celebrityId = this.props.match.params.celebrityId
    this.props.fetch(celebrityId)
  }

  populateLocalStorage() {
    if (this.props.userId) {
      this.setState({
        cart: this.props.currentOrder
      })
    } else {
      for (let key in this.state) {
        if (localStorage.hasOwnProperty(key)) {
          let value = localStorage.getItem(key)
          try {
            value = JSON.parse(value)
            this.setState({[key]: value})
          } catch (e) {
            this.setState({[key]: value})
          }
        }
      }
    }
  }

  addToCart(item, quantity) {
    if (this.props.userId) {
      const addedItem = {
        orderId: this.state.cart.id,
        userId: this.props.userId,
        celebrityId: item.id,
        quantity: quantity
      }
      this.props.addItem(this.props.userId, this.state.cart.id, addedItem)
    } else {
      let { cart, quantities } = this.state
      let subCart = cart.filter(elem => elem.id === item.id)
      if (subCart.length) {
        if (quantities[item.id]) {
          quantities[item.id] = Number(quantities[item.id]) + Number(quantity)
        } else {
          quantities[item.id] = quantity
        }
      } else {
        cart.push(item)
        quantities[item.id] = quantity
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      localStorage.setItem('quantities', JSON.stringify(quantities))
      this.setState({cart, quantities})
    }
  }

  render() {
    const {oneCelebrity} = this.props.celebrity
    const celebrity = oneCelebrity
    return celebrity ? (
      <div id="celebrity-single-view-container">
        <h1 className="product-name-single">
          {celebrity.firstName} {celebrity.lastName}
        </h1>
        <img className="celebrity-profile-img" src={celebrity.imageUrl} />
        <div className="product-details-single">
          <h2 className="product-header-single">Get to know {celebrity.firstName} {celebrity.lastName}!</h2>
          <h4>Super Celeb Powers:</h4>
          <div className="product-occupation-single">{celebrity.occupation}</div>
          <h4>Gender:</h4>
          <div className="product-gender">{celebrity.gender}</div>
          <h4>Net Worth:</h4>
          <div className="product-networth">{celebrity.netWorthMillions}</div>
          <h4>Celeb Quote:</h4>
          <p className="product-description">"{celebrity.description}"</p>
        </div>

        <AddCart
          celebrity={celebrity}
          cart={this.state.cart}
          addToCart={this.addToCart}
          addType="Add"
        />
        <div className="product-reviews-container"><Reviews/></div>
        <div className="product-actions-single">
        {this.props.isAdmin && (
          <div>
            <button type='button' onClick={() => this.setState({update: !this.state.update})}>Update Celebrity</button>
            {this.state.update ? <UpdateCelebrity /> : null}
            <button
              onClick={() => this.props.deleted(celebrity.id)}
              type="button"
              className="delete"
            >
              Delete Celebrity
            </button>
          </div>
        )}
        </div>
      </div>
    ) : (
      <p>Celebrity deleted</p>
    )
  }
}

const mapStateToProps = state => {
  return {
    celebrity: state.oneCelebrity,
    isAdmin: state.user.isAdmin,
    userId: state.user.id,
    currentOrder: state.orders.currentOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetch: celebrityId => dispatch(fetchCelebrity(celebrityId)),
    deleted: celebrityId => dispatch(removeSelectedCelebrity(celebrityId)),
    addItem: (userId, orderId, item) =>
      dispatch(fetchAddedItem(userId, orderId, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCelebrity)
