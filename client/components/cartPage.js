import React from 'react'
import {Link, Redirect} from 'react-router-dom'
// import CheckoutPage from './checkoutPage'

const CartPage = () => {
  const cartItems = JSON.parse(localStorage.cart)

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
            <button onClick={() => <Redirect to='/checkout' />} type="button">Checkout</button>
          </Link>
    </div>
    )
  }



export default CartPage;
