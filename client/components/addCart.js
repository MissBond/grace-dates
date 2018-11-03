import React from 'react'

const AddCart = (props) => {
    return (
      <button
        type="button"
        onClick={() => props.addToCart(props.celebrity)}
      >
        Add To Cart
      </button>
    )
}

export default AddCart
