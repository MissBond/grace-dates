import React, {Component} from 'react';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      promo: '',
      total: 0,
      complete: false
    };
   // this.submit = this.submit.bind(this);
  }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   this.props.updateCelebrity(this.state, this.props.selectedCelebrityId)
  // }

  render() {
    return (
      <div className="checkout">
        <h3>Hurry and complete your payment! Your celeb date can't wait!</h3>
        <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              </div>
              <div>
                <label htmlFor="firstName">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="promo">Promo Code:</label>
                <input
                  type="text"
                  name="total"
                  value={this.state.promo}
                  onChange={this.handleChange}
                />
              </div>
          <div className="checkout-total">
            Total: {this.state.total}
          </div>
          </form>
          <button onClick={this.submit}>Send</button>
          {this.state.complete ? <div>"Get ready for your date! Your purchase is complete!"</div> : <div>Oh no! Looks like you haven't completed your payment. Continue payment now before your celeb's spot is booked!</div>}
      </div>
    );
  }
}

export default CheckoutForm;
