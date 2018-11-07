import React from 'react'
import moment from 'moment'
import {postReview, fetchReviews} from '../store'
import {connect} from 'react-redux'
import Rating from 'react-rating'
import FormGroup from 'react-bootstrap'

class Reviews extends React.Component {
  constructor() {
    super()
    this.state = {
      reviewObj: {
        description: '',
        rating: 2,
        header: ''
      },
      review: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchReviews(this.props.celebrityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.celebrityId !== this.props.celebrityId) {
      this.props.fetchReviews(this.props.celebrityId)
    }
  }

  handleChange(event) {
    let newReviewObj = Object.assign({}, this.state.reviewObj)
    newReviewObj[event.target.name] = event.target.value
    this.setState({...this.state, reviewObj: newReviewObj})
  }

  handleRatingChange(rating) {
    this.setState({...this.state, reviewObj: {...this.state.reviewObj, rating}})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postReview(
      this.props.userId,
      this.props.celebrityId,
      this.state.reviewObj.header,
      this.state.reviewObj.rating,
      this.state.reviewObj.description
    )
    this.setState({
      reviewObj: {
        description: '',
        rating: 2,
        header: ''
      },
      review: false
    })
  }

  render() {
    const {reviews} = this.props.reviews
    return (
      <div className="reviews">
        <h3>Customer Reviews:</h3>
        <ol>
          {reviews.length ? (
            reviews.map(elem => {
              console.log(elem)
              return (
                <li key={elem.id}>
                  {elem.header}
                  <br />
                  Rated {elem.rating} out of 5 hearts!
                  <br />
                  Posted {moment(elem.updatedAt).format('MMM Do YYYY')}
                  <br />
                  {elem.description}
                  <br />by
                  {elem.user ?
                  ` ${elem.user.firstName} ${elem.user.lastName}` :
                  ` ${this.props.userFirstName} ${this.props.userLastName}`
                  }
                </li>
              )
            })
          ) : (
            <h4>No reviews available</h4>
          )}
        </ol>
        {this.props.userId && (
          <button
            type="button"
            onClick={() => this.setState({review: !this.state.review})}
          >
            Write Review
          </button>
        )}
         <br/> <br/>
        {this.state.review && (
          <form onSubmit={this.handleSubmit}>
           <label htmlFor="header">Title</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="header"
              value={this.state.reviewObj.header}
            />
           <br/>
            <Rating
              name="rating"
              value={this.state.reviewObj.rating}
              onChange={this.handleRatingChange}
              initialRating={this.state.reviewObj.rating}
              emptySymbol={<img src="/images/heart_empty.png" className="icon" />}
              fullSymbol={<img src="/images/heart_full.png" className="icon" />}
            />
            <label htmlFor="description">Review</label>
            <div className="reviews-body">
            <textarea
              name="description"
              value={this.state.reviewObj.description}
              onChange={this.handleChange}
            />
            </div>
             <br/>
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
    postReview: (userId, celebrityId, header, rating, description) =>
      dispatch(postReview(userId, celebrityId, header, rating, description)),
    fetchReviews: celebrityId => dispatch(fetchReviews(celebrityId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
