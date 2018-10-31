import React from 'react'
import {connect} from 'react-redux'
import {fetchAllCelebrities} from '../store/celebrities'
//this was an attempt to bring in logged in user data
// import {me} from '../store/user'
import {Link} from 'react-router-dom'
import AddCelebrityForm from './addCelebrityForm';

class AllCelebrities extends React.Component {
    
  componentDidMount() {
    this.props.loadCelebrities()
    //this was part of the attempt to bring in logged in user data
    // const user = this.props.loadUser()
  }

  calculatePricePerMin(netWorth) {
    const minsPerYr = 525600
    //I think this is far too expensive.
    return (netWorth * 100000 / minsPerYr).toFixed(2)
  }

  render() {
    const {celebrities} = this.props.celebrities
    return (
      <div>
        <h1>Choose Your Date!</h1>
        <div>
          <ul>
            {celebrities.map(celebrity => (
              <div key={celebrity.id}>
                <button type='button'>Add to Cart</button>
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
        <AddCelebrityForm />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {celebrities: state.celebrities}
}

const mapDispatchToProps = dispatch => {
  return {
    loadCelebrities: () => dispatch(fetchAllCelebrities())
    //this was us trying to bring in user information
    // loadUser: async () => dispatch(await me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCelebrities)
