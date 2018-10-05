import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Title>
          hello <span>👋</span>
        </Title>
        <div>
          <a href="/auth/google">sign up with google</a>
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

const Title = styled.div`
  font-size: 2em;
  padding-bottom: 1em;
`;