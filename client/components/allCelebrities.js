import React from 'react'
import { connect } from 'react-redux'
import { fetchAllCelebrities, setVisibilityFilter } from '../store/celebrities'
//this was an attempt to bring in logged in user data
// import {me} from '../store/user'
import { Link } from 'react-router-dom'
import AddCelebrityForm from './addCelebrityForm'


class AllCelebrities extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
    this.populateLocalStorage = this.populateLocalStorage.bind(this);
  }
  componentDidMount() {
    this.props.loadCelebrities()
    this.populateLocalStorage();
    //this was part of the attempt to bring in logged in user data
    // const user = this.props.loadUser()
  }

  calculatePricePerMin(netWorth) {
    const minsPerYr = 525600
    //I think this is far too expensive.
    return (netWorth * 100000 / minsPerYr).toFixed(2)
  }

  addToCart(item) {
    let cart = this.state.cart;
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState(cart)
    console.log(this.state.cart)
  }

  populateLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key)
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value })
        } catch (e) {
          this.setState({ [key]: value })
        }
      }
    }
  }

  render() {
    const { celebrities, visibilityFilter } = this.props.celebrities
    const filteredCelebrities =
      visibilityFilter === 'All'
        ? celebrities
        : visibilityFilter === 'Female'
          ? celebrities.filter(celebrity => celebrity.gender === 'Female')
          : celebrities.filter(celebrity => celebrity.gender === 'Male')
    return (
      <div>
        <h1>Choose Your Date!</h1>
        <div>
          <select onChange={event => this.props.changeView(event.target.value)}>
            <option value="All">All</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div>
          <ul>
            {filteredCelebrities.map(celebrity => (
              <div key={celebrity.id}>
                <button onClick={() => this.addToCart(celebrity)} type="button">Add to Cart</button>
                <li key={celebrity.id}>
                  <Link to={`/celebrities/${celebrity.id}`}>{`${
                    celebrity.firstName
                    } ${celebrity.lastName}`}</Link>
                  <br />
                  Occupation: {`${celebrity.occupation}`}
                  <br />
                  Price Per Minute: ${this.calculatePricePerMin(
                    celebrity.netWorthMillions
                  )}
                  <br />
                  <img src={celebrity.imageUrl} />
                </li>
                <br />
              </div>
            ))}
          </ul>
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
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCelebrities: () => dispatch(fetchAllCelebrities()),
    //this was us trying to bring in user information
    // loadUser: async () => dispatch(await me())
    changeView: status => dispatch(setVisibilityFilter(status)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCelebrities)
