import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearOrders} from '../store'
import ShoppingCart from './shoppingCart'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <div id="nav-bar-left">
            <Link to="/home">Grace Dates</Link>
            <Link to="/home">Home</Link>
            <Link to="/celebrities">All Celebrities</Link>
            <Link to="/users">All Users</Link>
          </div>
          <div id="nav-bar-right">
            <Link to="/cart">Cart</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <div id="nav-bar-left">
            <Link to="/home">
              <h1>Grace Dates</h1>
            </Link>
            <Link to="/home">Home</Link>
            <Link to="/celebrities">All Celebrities</Link>
          </div>
          <div id="nav-bar-right">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearOrders())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
