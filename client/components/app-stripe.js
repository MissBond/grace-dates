import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './checkoutForm';

class AppStripe extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_ZKBtEXfyiNx7hi5G6pROsN5d">
        <div className="example">
          <h1>Checkout</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default AppStripe;
