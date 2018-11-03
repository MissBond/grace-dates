import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CheckoutForm from './checkoutForm'
import AddCart from './addCart'
import {
  fetchWithUpdatedQuantity,
  fetchWithoutDeletedItem
} from '../store/orders'

const CartPage = props => {
  const cartItems = props.userId
    ? props.currentOrder.celebrities
    : JSON.parse(localStorage.cart)
  return (
    <div>
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
      <Link to="/checkout">
        <button onClick={() => <CheckoutForm />} type="button">
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
