import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });

    if (response.ok) console.log("Purchase Complete!")
    if (response.ok) this.setState({complete: true});
  }

  render() {
    return (
      <div className="checkout">
        <p>Hurry and complete your payment! Your celeb date can't wait!</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
        {this.state.complete ? <div>"Get ready for your dat! Your purchase is complete!"</div> : <div>Oh no! Looks like you haven't completed your payment. Continue payment now before your celeb's spot is booked!</div>}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
