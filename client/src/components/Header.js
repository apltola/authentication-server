import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/sass/components/Header.scss';


export default class Header extends Component {

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
            <a href="https://www.npmjs.com/" target="_blank">
              <button className="google-button">
                
                <span className="btn-txt">sign in with Google</span>
              </button>
            </a>
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
            <a href="https://www.npmjs.com/" target="_blank">
              <button className="google-button">
                sign up with Google
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  }
}