import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/userForAdmins'

export class SingleUser extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.id
    this.props.fetchOneUser(userId)
  }

  render() {
    console.log('this.is.props', this.props)
    const {user} = this.props
    console.log('!!!!!', user)
    return (
      <main>
        <div>
          <h1> hello world</h1>
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {student: state.users.singleUser}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOneUser: id => {
      dispatch(fetchSingleUser(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
