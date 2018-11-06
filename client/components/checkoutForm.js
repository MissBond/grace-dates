import React, {Component} from 'react';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      promo: '',
      total: 0,
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="checkout">
        <h3>Hurry and complete your payment! Your celeb date can't wait!</h3>
         <form>
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
      </div>
    );
  }
}

export default CheckoutForm;
