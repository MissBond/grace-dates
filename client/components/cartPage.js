import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import CheckoutForm from './checkoutForm';

const CartPage = (props) => {
  const cartItems = props.userId ? props.currentOrder.celebrities : JSON.parse(localStorage.cart)
  return (
    <div>
         <ol>
            {cartItems.map((celebrity, i) => (
              <div key={i}>
                {/* <button onClick={() => this.addToCart(celebrity)} type="button">Remove from Cart</button> */}
                <li key={celebrity.id}>
                  <Link to={`/celebrities/${celebrity.id}`}>{`${
                    celebrity.firstName
                    } ${celebrity.lastName}`}</Link>
                  <br />
                  Occupation: {`${celebrity.occupation}`}
                  <br />
                  <img src={celebrity.imageUrl} />
                </li>
                <br />
              </div>
            ))}
          </ol>
          <Link to='/checkout'>
            <button onClick={() => <CheckoutForm />} type="button">Checkout</button>
          </Link>
    </div>
    )
  }

  const mapStateToProps = state => {
    return {
      userId: state.user.id,
      currentOrder: state.orders.currentOrder
    }
  }

  export default connect(mapStateToProps)(CartPage)

