import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

export default class Header extends Component {
  render() {
    return (
      <div>
        <h1>
        <StyledLink to="/">REACT APP WITH WEBPACK 4</StyledLink>
        </h1>
      </div>
    )
  }
}

const __Link = ({ className, to, children }) => (
  <Link to={to} className={className}>
    {children}
  </Link>
)

const StyledLink = styled(__Link)`
  display: inline-block;
  color: #000;
  font-weight: bold;
  text-decoration: none;
  transition: all 250ms;

  :after {
    content: '';
    width: 0;
    height: 2px;
    display: block;
    background: goldenrod;
    transition: all 250ms;
  }
  
  :hover {
    color: goldenrod;
  }

  &:hover:after {
    width: 100%;
  }
`;