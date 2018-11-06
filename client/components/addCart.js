import React from 'react'
import {ToastContainer, ToastStore} from 'react-toasts'

class AddCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.addType === 'Add' ? 1 : this.props.currentQuantity
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault()
          this.props.addType === 'Add'
            ? this.props.addToCart(
                this.props.celebrity,
                this.state.quantity,
                this.props.addType
              )
            : this.props.userId
              ? this.props.handleUpdateClickThunk(
                  this.props.userId,
                  this.props.orderId,
                  this.state.quantity,
                  this.props.celebrityId
                )
              : this.props.handleUpdateClick(
                  this.props.celebrityId,
                  this.state.quantity
                )
        }}
      >
        {this.props.addType === 'Add' && 'Quantity: '}
        <input
          type="number"
          name="quantity"
          value={this.state.quantity}
          min="1"
          max="10"
          onChange={this.handleChange}
        />
        <button
          type="submit"
          onClick={() => ToastStore.success('Added to cart!')}
        >
          {this.props.addType}
        </button>
        <ToastContainer
          lightBackground={true}
          store={ToastStore}
          position={ToastContainer.POSITION.BOTTOM_RIGHT}
          timer={1000}
        />
      </form>
    )
  }
}

export default AddCart
