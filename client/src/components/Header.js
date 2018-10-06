import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import googleIcon from '../styles/images/icon_google.png';
import '../styles/sass/components/Header.scss';

export default class Header extends Component {

  getGoogleBtn(type) {
    return <a href="/auth/google">
      <button className="google-button">
        <div className="btn-content">
          <img className="btn-icon" src={googleIcon} alt="icon" />
          <span className="btn-txt">{`${type} with Google`}</span>
        </div>
      </button>
    </a>
  }

  render() {
    return <div className="header">
      <div className="brand">
        <Link to="/">AUTHENTICATION BOILERPLATE</Link>
      </div>
      <div className="auth-container">
        <div className="sign-in-container">
          <div className="title">
            sign in
          </div>
          <div className="selection">
            {this.getGoogleBtn('login')}
          </div>
        </div>
        <div className="separator">
          /
        </div>
        <div className="register-container">
          <div className="title">
            register
          </div>
          <div className="selection">
            {this.getGoogleBtn('sign up')}
          </div>
        </div>
      </div>
    </div>
  }
}