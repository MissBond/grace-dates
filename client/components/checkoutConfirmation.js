import React from 'react';

const CheckoutConfirmation = () => {
    return (
      <div>
        <h1>Your purchase is complete!</h1>
        <h2>Thank you for your order!</h2>
        <p>Your order confirmation number is {Math.floor(Math.random() * 100000) + 1 }</p>
        <h3>Hope your as excited as we are for your celeb date!</h3>
      </div>
    )
}
export default CheckoutConfirmation;
