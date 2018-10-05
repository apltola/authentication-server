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
        login or sign up
      </div>
    </div>
  }
}