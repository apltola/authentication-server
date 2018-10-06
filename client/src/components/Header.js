import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import googleIcon from '../styles/images/icon_google.png';
import '../styles/sass/components/Header.scss';

class Header extends Component {

  getGoogleButton(type) {
    return <a href="/auth/google" className="link-button">
      <button className="google-button">
        <div className="btn-content">
          <img className="btn-icon" src={googleIcon} alt="icon" />
          <span className="btn-txt">{`${type} with Google`}</span>
        </div>
      </button>
    </a>
  }

  getAuthContainer() {
    switch(this.props.auth) {
      case null: return null;

      case false: return <div className="auth-container">
        <div className="sign-in-container">
          <div className="title">login</div>
          <div className="selection">
            {this.getGoogleButton('login')}
          </div>
        </div>
        <div className="separator">/</div>
        <div className="register-container">
          <div className="title">register</div>
          <div className="selection">
            {this.getGoogleButton('sign up')}
          </div>
        </div>
      </div>

      default: return <div className="auth-container">
        <div className="logout">
          <strong><a href="/api/logout">logout</a></strong>
        </div>
      </div>
    }
  }

  render() {
    const brandLink = this.props.auth ? '/user' : '/';

    return <div className="header">
      <div className="brand">
        <Link to={brandLink}>AUTHENTICATION BOILERPLATE</Link>
      </div>
      {this.getAuthContainer()}
    </div>
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);