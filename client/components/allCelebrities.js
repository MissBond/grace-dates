import React from 'react'
import {connect} from 'react-redux'
import {fetchAllCelebrities, setVisibilityFilter} from '../store/celebrities'
import {Link} from 'react-router-dom'
import AddCelebrityForm from './addCelebrityForm'
import {fetchAddedItem} from '../store/orders'
import AddCart from './addCart'

class AllCelebrities extends React.Component {
  constructor() {
    super()
    this.state = {
      filterValue: '',
      filterGender: 'all',
      cart: []
    }
    this.populateLocalStorage = this.populateLocalStorage.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    this.props.loadCelebrities()
    this.populateLocalStorage()
  }

  updateFilter = event => {
    this.setState({
      filterValue: event.currentTarget.value,
      filterGender: 'all'
    })
  }

  calculatePricePerMin(netWorth) {
    const minsPerYr = 525600
    //I think this is far too expensive.
    return (netWorth * 100000 / minsPerYr).toFixed(2)
  }

  addToCart(item, quantity) {
    if (this.props.userId) {
      const addedItem = {
        orderId: this.state.cart.id,
        userId: this.props.userId,
        celebrityId: item.id,
        quantity: quantity
      }
      this.props.addItem(this.props.userId, this.state.cart.id, addedItem)
    } else {
      let cart = this.state.cart
      cart.push(item)
      localStorage.setItem('cart', JSON.stringify(cart))
      this.setState(cart)
    }
  }

  populateLocalStorage() {
    if (this.props.userId) {
      this.setState({
        cart: this.props.currentOrder
      })
    } else {
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
  }

  getFilteredCelebrites() {
    const {filterValue} = this.state
    const {celebrities, visibilityFilter} = this.props.celebrities

    if (filterValue.length === 0) return celebrities

    const pattern = new RegExp(filterValue, 'i')

    return celebrities.filter(celebrity => {
      if (!pattern.test(celebrity.firstName)) return false
      // if gender isn't all and celeb.gender !==... return false

      return true
    })
  }

  renderCelebrites() {
    const filteredCelebrites = this.getFilteredCelebrites()

    return filteredCelebrites.map(celebrity => (
      <div key={celebrity.id}>
        <div className="product-info">
          <div className="product-image">
            <img src={celebrity.imageUrl} />
          </div>
          <h5>
            <Link to={`/celebrities/${celebrity.id}`}>{`${
              celebrity.firstName
            } ${celebrity.lastName}`}</Link>
          </h5>
          <h6>Occupation: {`${celebrity.occupation}`}</h6>
          <h6>
            Price Per Minute: ${this.calculatePricePerMin(
              celebrity.netWorthMillions
            )}
          </h6>
          <AddCart
            celebrity={celebrity}
            cart={this.state.cart}
            addToCart={this.addToCart}
            addType="Add"
          />
        </div>
      </div>
    ))
  }

  render() {
    // const {celebrities, visibilityFilter} = this.props.celebrities
    // const filteredCelebrities =
    //   visibilityFilter === 'All'
    //     ? celebrities
    //     : visibilityFilter === 'Female'
    //       ? celebrities.filter(celebrity => celebrity.gender === 'Female')
    //       : celebrities.filter(celebrity => celebrity.gender === 'Male')
    return (
      <div>
        <h1>Choose Your Date!</h1>
        <div>
          <form>
            <input
              type="text"
              placeholder="Search..."
              onChange={this.updateFilter}
            />
          </form>
        </div>
        <div>
          <select onChange={event => this.props.changeView(event.target.value)}>
            <option value="All">All</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div>
          <ul>{this.renderCelebrites()}</ul>
        </div>
        {this.props.isAdmin && <AddCelebrityForm />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    celebrities: state.celebrities,
    isAdmin: state.user.isAdmin,
    // cart: state.cart,
    userId: state.user.id,
    currentOrder: state.orders.currentOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCelebrities: () => dispatch(fetchAllCelebrities()),
    changeView: status => dispatch(setVisibilityFilter(status)),
    addItem: (userId, orderId, item) =>
      dispatch(fetchAddedItem(userId, orderId, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCelebrities)
