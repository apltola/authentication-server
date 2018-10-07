import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';

import '../styles/sass/components/App.scss';
import { fetchUser } from '../actions';
import Header from '../components/Header';
import LandingPage from './LandingPage';
import UserPage from './UserPage';

const LoadableNotFoundPage = Loadable({
  loader: () => import('./NotFound'),
  loading: () => <div>LOADING...</div>,
  delay: 1000
});

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="app">
            <div className="content">
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/user" component={UserPage} />
                <Route component={LoadableNotFoundPage} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default connect(null, { fetchUser })(hot(module)(App));
