import React, {Component} from 'react';
import Checkout from './checkout';
import CheckoutForm from './checkoutForm';

class AppStripe extends Component {
  render() {
    return (
        <div className="example">
          <h1>Checkout</h1>
            <CheckoutForm />
            <Checkout
              name={'The Road to learn React'}
              description={'Only the Book'}
              amount={1}
            />
        </div>
    );
  }
}

export default AppStripe;
