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

function calculatePricePerMin(netWorth) {
  const minsPerYr = 525600
  return (netWorth * 100000 / minsPerYr).toFixed(2)
}

const CartPage = props => {
  const cartItems = props.userId
    ? props.currentOrder.celebrities
    : JSON.parse(localStorage.cart)
  return (
    <div>
      {cartItems.length ? (
        <ol>
          {cartItems.map((celebrity, i) => (
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
                  : 'Fix for local storage'}
                <br />
                Subtotal: ${+(celebrity.celebrityOrder
                  ? `${celebrity.celebrityOrder.quantity}`
                  : 'Fix for local storage') *
                  +calculatePricePerMin(celebrity.netWorthMillions)}
                <div>
                  <AddCart
                    addType="Update Quantity"
                    updateQuantity={props.updateQuantity}
                    celebrityId={celebrity.id}
                    orderId={props.currentOrder.id}
                    currentQuantity={celebrity.celebrityOrder.quantity}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      props.deleteItem(
                        props.userId,
                        props.currentOrder.id,
                        celebrity.id
                      )
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
      ) : (
        <div>
          <h3>It looks like your cart is empty!</h3>
        </div>
      )}
      <div>
        Total: ${cartItems.reduce((acc, celebrity) => {
          return (
            acc +
            +(celebrity.celebrityOrder
              ? `${celebrity.celebrityOrder.quantity}`
              : 'Fix for local storage') *
              +calculatePricePerMin(celebrity.netWorthMillions)
          )
        }, 0)}
      </div>
      <Link to="/checkout">
        <button onClick={() => <AppStripe />} type="button">
          Checkout
        </button>
      </Link>
    </div>
  )
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
