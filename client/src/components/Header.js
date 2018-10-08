import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import googleIcon from '../styles/images/icon_google.png';
import facebookIcon from '../styles/images/icon_facebook.png';
import twitterIcon from '../styles/images/icon_twitter.png';
import '../styles/sass/components/Header.scss';

class Header extends Component {

  getGoogleButton() {
    return <a href="/auth/google" className="link-button">
      <button className="google-button">
        <div className="btn-content">
          <img className="btn-icon" src={googleIcon} alt="icon" />
          <span className="btn-txt">continue with Google</span>
        </div>
      </button>
    </a>
  }

  getFacebookButton() {
    return <a href="/auth/facebook" className="link-button">
      <button className="facebook-button">
        <div className="btn-content">
          <img className="btn-icon" src={facebookIcon} alt="icon" />
          <span className="btn-txt">continue with Facebook</span>
        </div>
      </button>
    </a>
  }

  getTwitterbutton() {
    return <a href="/auth/twitter" className="link-button">
      <button className="twitter-button">
        <div className="btn-content">
          <img className="btn-icon" src={twitterIcon} alt="icon" />
          <span className="btn-txt">continue with Twitter</span>
        </div>
      </button>
    </a>
  }

  getAuthContainer() {
    switch(this.props.auth) {
      case null: return null;

      case false: return <div className="auth-container">
        <div className="sign-in-container">
          <div className="title">login / sign up</div>
          <div className="selection">
            {this.getGoogleButton()}
            {this.getFacebookButton()}
            {this.getTwitterbutton()}
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