import React, {Component} from 'react'
import {updateSelectedCelebrity} from '../store'
import {connect} from 'react-redux'

class UpdateCelebrity extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      imageUrl: '',
      occupation: '',
      gender: '',
      netWorthMillions: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevState) {
    if (prevState.selectedCelebrity !== this.props.selectedCelebrity) {
      this.setState({
        firstName: this.props.selectedCelebrity.firstName,
        lastName: this.props.selectedCelebrity.lastName,
        imageUrl: this.props.selectedCelebrity.imageUrl,
        occupation: this.props.selectedCelebrity.occupation,
        gender: this.props.selectedCelebrity.gender,
        netWorthMillions: this.props.selectedCelebrity.netWorthMillions,
        description: this.props.selectedCelebrity.description
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateCelebrity(this.state, this.props.selectedCelebrityId)
  }

  handleChange(event) {
    if (event.target.type === 'radio') {
      event.persist()
      this.setState({
        [event.target.name]: event.target.value
      })
    }
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image Link:</label>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={this.state.occupation}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            onChange={this.handleChange}
            type="radio"
            name="gender"
            id="male"
            value={this.state.gender}
          />
          <label htmlFor="male">Male</label>
          <input
            onChange={this.handleChange}
            type="radio"
            name="gender"
            id="female"
            value={this.state.gender}
          />
          <label htmlFor="male">Female</label>
          <input
            onChange={this.handleChange}
            type="radio"
            name="gender"
            id="other"
            value={this.state.gender}
          />
          <label htmlFor="other">Other</label>
        </div>
        <div>
          <label htmlFor="netWorthMillions">Net Worth ($millions):</label>
          <input
            type="text"
            name="netWorthMillions"
            value={this.state.netWorthMillions}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  const {oneCelebrity} = state.oneCelebrity

  return {
    selectedCelebrity: {
      firstName: oneCelebrity.firstName,
      lastName: oneCelebrity.lastName,
      imageUrl: oneCelebrity.imageUrl,
      occupation: oneCelebrity.occupation,
      gender: oneCelebrity.gender,
      netWorthMillions: oneCelebrity.netWorthMillions,
      description: oneCelebrity.description
    },
    selectedCelebrityId: oneCelebrity.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCelebrity: (celebrityToUpdate, celebrityId) => {
      dispatch(updateSelectedCelebrity(celebrityToUpdate, celebrityId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCelebrity)
