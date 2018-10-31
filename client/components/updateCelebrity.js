import React, {Component} from 'react'
import {updateSelectedCelebrity} from '../store'
import {connect} from 'react-redux'

class UpdateCelebrity extends Component {
  constructor() {
    super()
    console.log('PROPS', this.props)
    this.state = this.props.selectedCelebrity
    // console.log('PROPS', props)
    // this.state = {
    //   firstName: props.firstName
    // }
    // console.log(this.props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.updateCelebrity(this.state, this.props.selectedCelebrityId)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <h1>hello world</h1>
      // <form onSubmit={this.handleSubmit}>
      //   <div>
      //     <label htmlFor="firstName">First Name:</label>
      //     <input
      //       type="text"
      //       name="firstName"
      //       value={this.state.firstName}
      //       onChange={this.handleChange}
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor="lastName">Last Name:</label>
      //     <input
      //       type="text"
      //       name="lastName"
      //       value={this.state.lastName}
      //       onChange={this.handleChange}
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor="imageUrl">Image Link:</label>
      //     <input
      //       type="text"
      //       name="imageUrl"
      //       value={this.state.imageUrl}
      //       onChange={this.handleChange}
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor="occupation">Occupation:</label>
      //     <input
      //       type="text"
      //       name="occupation"
      //       value={this.state.occupation}
      //       onChange={this.handleChange}
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor="gender">Gender:</label>
      //     <input
      //       type="text"
      //       name="gender"
      //       value={this.state.gender}
      //       onChange={this.handleChange}
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor="netWorthMillions">Net Worth ($millions):</label>
      //     <input
      //       type="text"
      //       name="netWorthMillions"
      //       value={this.state.netWorthMillions}
      //       onChange={this.handleChange}
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor="description">Description:</label>
      //     <input
      //       type="text"
      //       name="description"
      //       value={this.state.description}
      //       onChange={this.handleChange}
      //     />
      //   </div>
      //   <div>
      //     <button type="submit">Submit</button>
      //   </div>
      // </form>
    )
  }
}

const mapStateToProps = state => {
  const {oneCelebrity} = state.oneCelebrity
  console.log('ONE CELEB', oneCelebrity)
  return {
    selectedCelebrity: oneCelebrity,
    selectedCelebrityId: oneCelebrity.id
  }

  // return {
  //   selectedCelebrity: {
  //     firstName: oneCelebrity.firstName,
  //     lastName: oneCelebrity.lastName,
  //     imageUrl: oneCelebrity.email,
  //     occupation: oneCelebrity.imageUrl,
  //     gender: oneCelebrity.gender,
  //     netWorthMillions: oneCelebrity.netWorthMillions,
  //     description: oneCelebrity.description
  //   },
  //   selectedCelebrityId: oneCelebrity.id
  // }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCelebrity: (celebrityToUpdate, celebrityId) => {
      dispatch(updateSelectedCelebrity(celebrityToUpdate, celebrityId))
    }
  }
}

export default (
  connect(mapStateToProps, mapDispatchToProps)(UpdateCelebrity)
)
