import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import styled from 'styled-components'

import Header from './Header';
import Home from './Home';

const Loading = (props) => {
  if (props.error) {
    return (
      <LoadingContainer>Error! <button onClick={ props.retry }>Retry!</button></LoadingContainer>
    )
  }
  else if (props.timedOut) {
    <LoadingContainer>This sure is taking a long time... <span>🤨</span></LoadingContainer>
  }
  else if (props.pastDelay) {
    return <LoadingContainer>Loading...</LoadingContainer>
  }
  else return null;
}

const LoadableDemo = Loadable({
  loader: () => import('./Demo'),
  loading: Loading,
  delay: 300
});

const LoadableNotFound = Loadable({
  loader: () => import('./NotFound'),
  loading() {
    return <div>loading ...</div>
  },
  delay: 300
});

export default class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Route component={Header} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/demo" component={LoadableDemo} />
            <Route component={LoadableNotFound}/>
          </Switch>
        </Container>
      </Router>
    )
  }
}

const LoadingContainer = styled.div`
  text-align: center;
  font-size: 3em;
`;

const Container = styled.div`
`;
