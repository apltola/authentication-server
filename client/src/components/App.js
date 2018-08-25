import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import styled from 'styled-components'

import Header from './Header';
import Home from './Home';

const Loading = () => {
  if (props.error) {
    return (
      <div>Error! <button onClick={ props.retry }>Retry!</button></div>
    )
  }

  else if (props.pastDelay) {
    return <div>Loading...</div>
  }

  else return null;
}

const LoadableDemo = Loadable({
  loader: () => import('./Demo'),
  loading: Loading,
  delay: 500
});

const LoadableNotFound = Loadable({
  loader: () => import('./NotFound'),
  loading() {
    return <div>loading ...</div>
  },
  delay: 500
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

const Container = styled.div`
`;
