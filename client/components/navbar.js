import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearOrders} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className="navbar">
          {/* The navbar will show these links after you log in */}
          <div className="nav-bar-items">
            <Link className="nav-link" to="/home"><img className="logo-img" src="https://image.ibb.co/mh8Lsq/grace-Dates-Logo.png"/></Link>
            <Link className="nav-link" to="/home">Home</Link>
            <Link className="nav-link" to='/celebrities'>All Celebrities</Link>
      {isAdmin ? (
            <Link className="nav-link" to="/users">All Users</Link>
            ) : null }
          </div>
          <div className="nav-bar-items nav-bar-right">
            <Link className="nav-link" to='/cart'>Cart</Link>
            <a href="#" onClick={handleClick}>Logout</a>
          </div>
        </div>
      ) : (
          <div className="navbar">
          {/* The navbar will show these links before you log in */}
          <div className="nav-bar-items">
            <Link to="/home"><img className="logo-img" src="https://image.ibb.co/mh8Lsq/grace-Dates-Logo.png"/></Link>
            <Link className="nav-link" to="/home">Home</Link>
            <Link className="nav-link" to='/celebrities'>All Celebrities</Link>
          </div>
          <div className="nav-bar-items nav-bar-right">
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/signup">Sign Up</Link>
            <Link className="nav-link" to='/cart'>Cart</Link>
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
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
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
