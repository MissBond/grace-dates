import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedUser} from '../store'

/**
 * COMPONENT
 */
class UpdateUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('update user event',event)
    this.props.updateUser(this.props.user.id, this.state)
    this.setState({
      password: ''
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, updates) => {
      dispatch(fetchUpdatedUser(userId, updates))
    }
  }
}

export default connect(mapState, mapDispatch)(UpdateUserForm)
