import React from 'react';
import {Link} from 'react-router-dom'

const CheckoutLogin = () => {

    return (
      <div>
        <div className="checkout-message">Please login or sign up to complete your purchase</div>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </div>
    )
}
export default CheckoutLogin;