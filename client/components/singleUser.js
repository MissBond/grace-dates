import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/userForAdmins'
import UpdateUserForm from './updateUser'

export class SingleUser extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.id
    this.props.fetchOneUser(userId)
  }

  render() {
    const {singleUser} = this.props
    if (!singleUser) {
      return <div>Fetching user...</div>
    }

    return (
      <main>
        <div>
          <h1>
            User Name: {singleUser.firstName} {singleUser.lastName}
          </h1>
          <h3>email: {singleUser.email}</h3>
        </div>

        <div>
          <UpdateUserForm user={singleUser} />
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {singleUser: state.userForAdmins.singleUser}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOneUser: id => {
      dispatch(fetchSingleUser(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
