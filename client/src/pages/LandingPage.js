import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sass/components/LandingPage.scss';

export default class Home extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="title">
          hello, this is the landing page <span>👋</span>
        </div>
      </div>
    )
  }
}