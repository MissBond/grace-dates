import React from 'react'
import moment from 'moment'
import {postReview, fetchReviews} from '../store'
import {connect} from 'react-redux'

class Reviews extends React.Component {
  constructor() {
    super()
    this.state = {
      description: '',
      date: '',
      rating: 0,
      header: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.celebrityId !== this.props.celebrityId) {
      this.props.fetchReviews(this.props.celebrityId)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postReview(
      this.props.userId,
      this.props.celebrityId,
      this.state.header,
      this.state.date,
      this.state.rating,
      this.state.description
    )
    this.setState({
      description: '',
      date: '',
      rating: 0,
      header: ''
    })
  }

  render() {
    const {reviews} = this.props.reviews
    return (
      <div>
        Customer Reviews:
        <ol>
          {!reviews.length
            ? 'Loading'
            : reviews.map(elem => {
                return (
                  <li key={elem.id}>
                    <h3>
                      {elem.header}: {elem.rating}
                    </h3>
                    <br />
                    {moment(elem.updatedAt).format('MMM Do YYYY')}
                    <br />
                    {elem.description}
                    <br />by {this.props.userFirstName} {this.props.userLastName}
                  </li>
                )
              })}
        </ol>
        {this.props.userId && (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="header">Title</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="header"
              value={this.state.header}
            />
            <label htmlFor="date">Date</label>
            <input
              onChange={this.handleChange}
              type="date"
              name="date"
              value={this.state.date}
            />
            <label htmlFor="rating">Rating</label>
            <input
              onChange={this.handleChange}
              type="range"
              name="rating"
              value={this.state.rating}
              min="0"
              max="5"
            />
            <label htmlFor="description">Review</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews,
    userId: state.user.id,
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    celebrityId: state.oneCelebrity.oneCelebrity.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postReview: (userId, celebrityId, header, date, rating, description) =>
      dispatch(postReview(userId, celebrityId, header, date, rating, description)),
    fetchReviews: celebrityId => dispatch(fetchReviews(celebrityId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
