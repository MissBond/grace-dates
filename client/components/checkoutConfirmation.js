import React from 'react';

const CheckoutConfirmation = () => {
    const orderNumber = (n) => n+ 100000;
    return (
      <div>
        <h1>Your purchase is complete!</h1>
        <h2>Thank you for your order!</h2>
        <p>Your order confirmation number is {orderNumber()}</p>
        <h3>Hope you're as excited as we are for your celeb date!</h3>
      </div>
    )
}
export default CheckoutConfirmation;
