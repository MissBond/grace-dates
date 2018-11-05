import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Checkout from './checkout';
// import CheckoutForm from './CheckoutForm';

class AppStripe extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_ZKBtEXfyiNx7hi5G6pROsN5d">
        <div className="example">
          <h1>Checkout</h1>
          <Elements>
            <Checkout
              name={'The Road to learn React'}
              description={'Only the Book'}
              amount={1}
            />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default AppStripe;
