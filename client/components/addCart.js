import React from 'react'

class AddCart extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  addToCart(item) {
    let cart = this.props.cart
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState(cart)
    console.log(this.props.cart)
  }

  render() {
    return (
      <button
        type="button"
        onClick={() => this.addToCart(this.props.celebrity)}
      >
        Add To Cart
      </button>
    )
  }
}

export default AddCart
