import React from 'react'
import {connect} from 'react-redux'

class PromoCode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    let len = event.target.value.length - 1
    if (event.target.value[len] === ' ') {
      this.setState({
        [event.target.name]: event.target.value.slice(0, len).toLowerCase()
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value.toLowerCase()
      })
    }
  }
  render() {
    return (
      <form onSubmit={event => this.props.handleSubmit(event, this.state.code)}>
        <input
          type="text"
          name="code"
          value={this.state.code}
          onChange={this.handleChange}
        />
        <button type="submit">Apply Promo Code</button>
      </form>
    )
  }
}

export default PromoCode
