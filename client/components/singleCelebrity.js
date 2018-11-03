import React from 'react'
import {connect} from 'react-redux'
import UpdateCelebrity from './updateCelebrity'
import {fetchCelebrity, removeSelectedCelebrity} from '../store'
import Reviews from './reviews'
import AddCart from './addCart'
import { runInThisContext } from 'vm';

class SingleCelebrity extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
    this.populateLocalStorage = this.populateLocalStorage.bind(this)
  }

  componentDidMount() {
    this.populateLocalStorage()
    const celebrityId = this.props.match.params.celebrityId
    this.props.fetch(celebrityId)
  }

  populateLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key)
        try {
          value = JSON.parse(value)
          this.setState({[key]: value})
        } catch (e) {
          this.setState({[key]: value})
        }
      }
    }
  }

  addToCart(item) {
    let cart = this.state.cart
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState(cart)
    console.log(this.state.cart)
  }

  render() {
    const {oneCelebrity} = this.props.celebrity
    const celebrity = oneCelebrity

    return celebrity ? (
      <div id="celebrity-single-view-container">
        <h1>
          {celebrity.firstName} {celebrity.lastName}
        </h1>
        <img className="celebrity-profile-img" src={celebrity.imageUrl} />
        <h3>{celebrity.occupation}</h3>
        <div>{celebrity.gender}</div>
        <div>{celebrity.netWorthMillions}</div>
        <p>{celebrity.description}</p>
        {this.props.isAdmin && <UpdateCelebrity />}
        <AddCart
          celebrity={celebrity}
          cart={this.state.cart}
          addToCart={this.addToCart}
        />
        <Reviews />
        <button
          onClick={() => this.props.deleted(celebrity.id)}
          type="button"
          className="delete"
        >
          Delete
        </button>
      </div>
    ) : (
      <p>no celeb</p>
    )
  }
}

const mapStateToProps = state => {
  return {
    celebrity: state.oneCelebrity,
    isAdmin: state.user.isAdmin,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetch: celebrityId => dispatch(fetchCelebrity(celebrityId)),
    deleted: celebrity => dispatch(removeSelectedCelebrity(celebrity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCelebrity)
