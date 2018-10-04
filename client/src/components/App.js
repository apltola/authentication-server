import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import styled from 'styled-components';

import Header from './Header';
import Home from './Home';
import { hostname } from 'os';

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

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route component={Header} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/demo" component={LoadableDemo} />
            <Route component={LoadableNotFound}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default hot(module)(App);

const LoadingContainer = styled.div`
  text-align: center;
  font-size: 3em;
`;