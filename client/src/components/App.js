import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import styled from 'styled-components';

import '../styles/sass/components/App.scss';
import Header from './Header';
import Home from './Home';

const Loading = props => {
  if (props.error) {
    return <LoadingContainer>
      Error! <button onClick={ props.retry }>Retry!</button>
    </LoadingContainer>
  }

  else if (props.timedOut) {
    return <LoadingContainer>This sure is taking a long time... <span>🤨</span></LoadingContainer>
  }

  else if (props.pastDelay) {
    return <LoadingContainer>Loading...</LoadingContainer>
  }

  else return null;
}

const LoadableDemoPage = Loadable({
  loader: () => import('./Demo'),
  loading: Loading,
  delay: 1000
});

const LoadableNotFoundPage = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading,
  delay: 1000
});

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="app">
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/demo" component={LoadableDemoPage} />
                <Route component={LoadableNotFoundPage} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

const LoadingContainer = styled.div`
  text-align: center;
  font-size: 3em;
`;

export default hot(module)(App);
