import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from '../constants/stripe';
import PAYMENT_SERVER_URL from '../constants/server';
import CheckoutConfirmation from './checkoutConfirmation';

const CURRENCY = 'USD';
const fromEuroToCent = amount => amount * 100;
let complete = false;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (amount, description) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);



const Checkout = ({ name, description, amount }) =>

  <StripeCheckout onClick={() => !!complete}
    name={name}
    description={description}
    amount={fromEuroToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

//   if (complete === true) {
//   <CheckoutConfirmation/>
//   } else {
//   // <div>Oh no! Looks like you haven't completed your payment. Continue payment now before your celeb's spot is booked!</div>
// }

export default Checkout;
