import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import googleIcon from '../styles/images/icon_google.png';
import facebookIcon from '../styles/images/icon_facebook.png';
import twitterIcon from '../styles/images/icon_twitter.png';
import githubIcon from '../styles/images/icon_github.png';
import '../styles/sass/components/Header.scss';

class Header extends Component {

  GoogleButton() {
    return <a href="/auth/google" className="link-button">
      <button className="google-button">
        <div className="btn-content">
          <img className="btn-icon" src={googleIcon} alt="icon" />
          <span className="btn-txt">continue with Google</span>
        </div>
      </button>
    </a>
  }

  FacebookButton() {
    return <a href="/auth/facebook" className="link-button">
      <button className="facebook-button">
        <div className="btn-content">
          <img className="btn-icon" src={facebookIcon} alt="icon" />
          <span className="btn-txt">continue with Facebook</span>
        </div>
      </button>
    </a>
  }

  Twitterbutton() {
    return <a href="/auth/twitter" className="link-button">
      <button className="twitter-button">
        <div className="btn-content">
          <img className="btn-icon" src={twitterIcon} alt="icon" />
          <span className="btn-txt">continue with Twitter</span>
        </div>
      </button>
    </a>
  }

  GithubButton() {
    return <a href="/auth/github" className="link-button">
      <button className="github-button">
        <div className="btn-content">
          <img className="btn-icon" src={githubIcon} alt="icon" />
          <span className="btn-txt">continue with Github</span>
        </div>
      </button>
    </a>
  }

  getAuthContainer() {
    switch(this.props.auth) {
      case null: return null;

      case false: return <div className="auth-container">
        <div className="auth-buttons">
          <div className="title">login / sign up</div>
          <div className="selection">
            {this.GoogleButton()}
            {this.FacebookButton()}
            {this.Twitterbutton()}
            {this.GithubButton()}
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