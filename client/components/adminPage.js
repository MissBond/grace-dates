import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/userForAdmins'

export class AdminPage extends React.Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    const {users} = this.props
    return (
      <div>
        <h2>Users</h2>
        <main>
          <ul>
            {users.map(user => {
              return (
                <div key={user.id}>
                  <Link to={`/users/${user.id}`}>
                    <li>{user.email}</li>
                  </Link>
                </div>
              )
            })}
          </ul>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {users: state.userForAdmins.users}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => {
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
