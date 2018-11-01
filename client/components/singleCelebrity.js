import React from 'react'
import {connect} from 'react-redux'
import UpdateCelebrity from './updateCelebrity'
import {fetchCelebrity, removeSelectedCelebrity} from '../store'
import AddCart from './addCart'

class SingleCelebrity extends React.Component {
  componentDidMount() {
    const celebrityId = this.props.match.params.celebrityId
    this.props.fetch(celebrityId)
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
    isAdmin: state.user.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetch: celebrityId => dispatch(fetchCelebrity(celebrityId)),
    deleted: celebrity => dispatch(removeSelectedCelebrity(celebrity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCelebrity)
