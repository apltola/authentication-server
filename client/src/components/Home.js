import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sass/components/Landing.scss';

export default class Home extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="title">
          hello <span>👋</span>
        </div>
        <div>
          <Link to="/demo">link to demo page</Link>
        </div>
        <div>
          <Link to="/aintnobodygonnafindthisshit">link to not found</Link>
        </div>
      </div>
    )
  }
}