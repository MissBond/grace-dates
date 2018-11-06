import React from 'react'
import {connect} from 'react-redux'
import {fetchAllCelebrities} from '../store/celebrities'
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
      cart: [],
      quantities: {}
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
      filterValue: event.currentTarget.value
    })
  }

  updateGenderFilter = event => {
    this.setState({
      filterGender: event.currentTarget.value
    })
  }

  componentDidUpdate(prevState) {
    if (prevState.quantities !== this.state.quanities) {
      this.populateLocalStorage()
    }
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
        celebrityId: item.id,
        quantity: quantity
      }
      this.props.addItem(this.props.userId, this.state.cart.id, addedItem)
    } else {
      let {cart, quantities} = this.state
      let subCart = cart.filter(elem => elem.id === item.id)
      if (subCart.length) {
        if (quantities[item.id]) {
          quantities[item.id] = Number(quantities[item.id]) + Number(quantity)
        } else {
          quantities[item.id] = quantity
        }
      } else {
        cart.push(item)
        quantities[item.id] = quantity
      }
      localStorage.setItem('quantities', JSON.stringify(quantities))
      localStorage.setItem('cart', JSON.stringify(cart))

      this.setState({cart, quantities})
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
    const {filterValue, filterGender} = this.state
    const {celebrities} = this.props.celebrities

    // Create a regular expression to match the user's filter value
    // the 'i' flag makes this pattern case insensitive
    const pattern = new RegExp(filterValue, 'i')

    // Filter all celebrities that do not match our criteria.
    return celebrities.filter(celebrity => {
      // Is the user looking for a particular gender?
      if (filterGender !== 'all') {
        // Reject any celebrity who's gender does not match.
        if (celebrity.gender !== filterGender) return false
      }
      // Is the user looking for a particular name?
      if (filterValue.length > 0) {
        // reject the celebrity if neither the first or last name do not match.

        // Reject any celebrity who's name does not match our pattern
        //const celebrityKeys = Object.keys(celebrity)
        // const celebrityKeys = ['firstName', 'lastName', 'occupation']
        // if (!celebrityKeys.some(key => pattern.test(celebrity[key]))) {
        //   return false
        // }

        if (
          !(
            pattern.test(celebrity.firstName) ||
            pattern.test(celebrity.lastName)
          )
        ) {
          return false
        }
      }
      return true
    })
  }

  renderCelebrites() {
    const filteredCelebrites = this.getFilteredCelebrites()

    return filteredCelebrites.map(celebrity => (
      <div key={celebrity.id} className="product-card">
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
    return (
      <div>
        <nav className="product-filter">
          <h1>Choose Your Date!</h1>
            <div className="collection-sort">
                <div className="search-bar">
                  <label id="search-label">Search:</label>
                  <input type="text" placeholder="Type to search!" onChange={this.updateFilter}/>
                </div>
                <div className="filter-bar">
                  <label id="filter-by-label">Filter By:</label>
                  <select id="custom-select" value={this.state.filterGender} onChange={this.updateGenderFilter}>
                    <option value="all">All</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
            </div>
        </nav>
        <section className="products">{this.renderCelebrites()}</section>
        {this.props.isAdmin && <AddCelebrityForm />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    celebrities: state.celebrities,
    isAdmin: state.user.isAdmin,
    userId: state.user.id,
    currentOrder: state.orders.currentOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCelebrities: () => dispatch(fetchAllCelebrities()),
    // changeView: status => dispatch(setVisibilityFilter(status)),
    addItem: (userId, orderId, item) =>
      dispatch(fetchAddedItem(userId, orderId, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCelebrities)
