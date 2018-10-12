import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../styles/sass/components/LandingPage.scss';

class Home extends Component {
  render() {
    if (this.props.auth) {
      return <Redirect to="/user" />
    }

    return (
      <div className="landing-page">
        <div className="title">
          <b>
            hello, this is a landing page <span>👋</span>
          </b>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Home);