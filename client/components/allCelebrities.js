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
      cart: []
    }
    this.populateLocalStorage = this.populateLocalStorage.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    this.props.loadCelebrities()
    this.populateLocalStorage()
  }

  calculatePricePerMin(netWorth) {
    const minsPerYr = 525600
    //I think this is far too expensive.
    return (netWorth * 100000 / minsPerYr).toFixed(2)
  }

  addToCart(item) {
    if (this.props.userId) {
      const addedItem = {
        orderId: this.state.cart.id,
        userId: this.props.userId,
        celebrityId: item.id,
        quantity: 1
      }
      this.props.addItem(
        this.props.userId,
        this.state.cart.id,
        addedItem
      )
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

  render() {
    const {celebrities, visibilityFilter} = this.props.celebrities
    const filteredCelebrities =
      visibilityFilter === 'All'
        ? celebrities
        : visibilityFilter === 'Female'
          ? celebrities.filter(celebrity => celebrity.gender === 'Female')
          : celebrities.filter(celebrity => celebrity.gender === 'Male')
    return (
      <div>
        <nav className="product-filter">
          <h1>Choose Your Date!</h1>
          <div className="sort">
            <div className="collection-sort">
              <label>Filter By:</label>
              <select onChange={event => this.props.changeView(event.target.value)}>
                <option value="All">All</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
          </div>
        </nav>

        <section className="products">
          {filteredCelebrities.map(celebrity => (
            <div key={celebrity.id} className="product-card">

              <div key={celebrity.id}>
                <div className="product-info">
                    <div className="product-image">
                      <img src={celebrity.imageUrl} />
                    </div>
                    <h5>
                      <Link to={`/celebrities/${celebrity.id}`}>{`${
                      celebrity.firstName} ${celebrity.lastName}`}</Link>
                    </h5>
                    <h6>Occupation: {`${celebrity.occupation}`}</h6>
                    <h6>Price Per Minute: ${this.calculatePricePerMin(
                      celebrity.netWorthMillions)}</h6>
                    <AddCart
                      celebrity={celebrity}
                      cart={this.state.cart}
                      addToCart={this.addToCart}
                    />
                </div>
              </div>

            </div>
           )
          )}
        </section>
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
