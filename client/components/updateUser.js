import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedUser} from '../store'

/**
 * COMPONENT
 */
class UpdateUserForm extends Component {
  constructor(props) {
    super(props)

    const {user} = this.props

    this.state = {
      form: {
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin
        // password: ''
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const {form} = this.state
    const {user, updateUser} = this.props

    updateUser(user.id, form)

    // form.password = ''
    this.setState({form})
  }

  handleChange = event => {
    const {target} = event
    const {form} = this.state // destructure form from state

    // assign the value to the form object
    form[target.name] =
      target.type === 'checkbox' ? target.checked : target.value

    this.setState({form}) // Tell react that the form object has changed
  }

  render() {
    const {form} = this.state
    return (
      <div>
        <h2>Update User</h2>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={this.handleChange}
              type="text"
            />
          </div>

          {/* <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={this.handleChange}
              type="password"
            />
          </div> */}
          {this.props.user.isAdmin ? (
            <div>
              <label htmlFor="isAdmin">
                <small>Admin</small>
              </label>
              <input
                id="isAdmin"
                name="isAdmin"
                checked={form.isAdmin}
                onChange={this.handleChange}
                type="checkbox"
              />
            </div>
          ) : null}
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, updates) => {
      dispatch(fetchUpdatedUser(userId, updates))
    }
  }
}

export default connect(null, mapDispatch)(UpdateUserForm)
