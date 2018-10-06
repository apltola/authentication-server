import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/sass/components/UserPage.scss';

class UserPage extends Component {

  getUserDetails(user) {
    if (!user) return null;

    return Object.keys(user)
      .filter(key => key !== '__v' && key !== '_id')
      .map(key => {
        if (key === 'imageUrl') {
          return <div key={key} className="user-detail-row">
            <span>image: </span><img className="user-img" src={user[key]} alt='user-image' />
          </div>
        }

        return <div key={key} className="user-detail-row">
          {`${key}: ${user[key]}`}
        </div>
    });
  }

  render() {
    const user = this.props.auth;

    return (
      <div className="user-page">
        <div className="page-title">
          this is the user page, you are logged in!
        </div>
        <div className="user-card-container">
          <div className="user-card">
            <div className="card-title">
              User information
            </div>
            <div className="user-details">
              {this.getUserDetails(user)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(UserPage);