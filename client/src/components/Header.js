import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import googleIcon from '../styles/images/icon_google.png';
import facebookIcon from '../styles/images/icon_facebook.png';
import twitterIcon from '../styles/images/icon_twitter.png';
import githubIcon from '../styles/images/icon_github.png';
import RegisterForm from '../components/registerForm';
import '../styles/sass/components/Header.scss';

class Header extends Component {
  constructor() {
    super();

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);

    this.state = {
      login_username: '',
      login_password: '',
      loginDetailsCollapsed: false
    }
  }

  GoogleButton() {
    return <a href="/auth/google" className="link-button">
      <button className="google-button">
        <div className="btn-content">
          <img className="btn-icon" src={googleIcon} alt="icon" />
          <span className="btn-txt">continue with Google</span>
        </div>
      </button>
    </a>
  }

  FacebookButton() {
    return <a href="/auth/facebook" className="link-button">
      <button className="facebook-button">
        <div className="btn-content">
          <img className="btn-icon" src={facebookIcon} alt="icon" />
          <span className="btn-txt">continue with Facebook</span>
        </div>
      </button>
    </a>
  }

  Twitterbutton() {
    return <a href="/auth/twitter" className="link-button">
      <button className="twitter-button">
        <div className="btn-content">
          <img className="btn-icon" src={twitterIcon} alt="icon" />
          <span className="btn-txt">continue with Twitter</span>
        </div>
      </button>
    </a>
  }

  GithubButton() {
    return <a href="/auth/github" className="link-button">
      <button className="github-button">
        <div className="btn-content">
          <img className="btn-icon" src={githubIcon} alt="icon" />
          <span className="btn-txt">continue with Github</span>
        </div>
      </button>
    </a>
  }

  handleUsernameChange(e) {
    this.setState({ login_username: e.target.value })
  }
  
  handlePasswordChange(e) {
    this.setState({ login_password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('state: ', this.state);
  }

  async handleRegisterClick() {
    await this.setState(prevState => {
      return { loginDetailsCollapsed: !prevState.loginDetailsCollapsed }
    })

    console.log(this.state);
  }

  getAuthContainer() {
    switch(this.props.auth) {
      case null: return null;

      case false: return <div className="auth-container">
        <div className="auth-buttons">
          <div className="auth-title">login / sign up</div>
          <div className="auth-card">
            <div className="auth-card-container">
              <div className="login-container" collapsed={`${this.state.loginDetailsCollapsed}`}>
                {this.GoogleButton()}
                {this.FacebookButton()}
                {this.Twitterbutton()}
                {this.GithubButton()}
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <div className="login-title">Login with username</div>
                  <label htmlFor="login_username">Username</label>
                  <input onChange={this.handleUsernameChange} value={this.state.username} type='text' name="login_username" autoComplete="off" />
                  <label htmlFor="login_password">Password</label>
                  <input onChange={this.handlePasswordChange} value={this.state.password} type='password' name="login_password" />
                  <div>
                    <button className="login-button" type="submit">Login</button>
                  </div>
                </form>
                <div className="register-trigger-container">
                  ...Or  <button className="register-trigger" onClick={this.handleRegisterClick}>create account</button>
                </div>
              </div>
              <div className="register-container" visible={`${this.state.loginDetailsCollapsed}`}>
                <div>
                  <span className="register-title">Create account</span>
                  <button className="cancel-register-button" onClick={this.handleRegisterClick}>
                    cancel
                  </button>
                </div>
                <RegisterForm registerCallback={() => this.props.history.push('/user')} />
              </div>
            </div>
          </div>
        </div>
      </div>

      default: return <div className="auth-container">
        <div className="logout">
          <strong><a href="/api/logout">logout</a></strong>
        </div>
      </div>
    }
  }

  render() {
    const brandLinkDestination = this.props.auth ? '/user' : '/';

    return <div className="header">
      <div className="brand">
        <Link to={brandLinkDestination}>AUTHENTICATION BOILERPLATE</Link>
      </div>
      {this.getAuthContainer()}
    </div>
  }
}

function mapStateToProps({ auth, authError }) {
  console.log({auth});
  console.log({authError});
  return { auth, authError };
}

export default connect(mapStateToProps)(Header);