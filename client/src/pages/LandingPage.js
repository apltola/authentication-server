import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../styles/sass/5-pages/LandingPage.scss';

class Home extends Component {
  constructor() {
    super();
    this.demoBtn = React.createRef();
    this.btnRipple = React.createRef();

    this.state = {
      button_ripple: false,
      rippleTop: '',
      rippleLeft: '',
      btnProcessing: false
    }
  }

  handleClick = event => {
    this.setState(prevState => ({button_ripple: !prevState.button_ripple}));
    const top = event.clientY - this.demoBtn.current.offsetTop;
    const left = event.clientX - this.demoBtn.current.offsetLeft;
    this.setState(() => ({
      rippleTop: top-20+'px',
      rippleLeft: left-20+'px'
    }));
    
    setTimeout(() => {
      this.setState(prevState => ({button_ripple: !prevState.button_ripple}));
    }, 500);

    setTimeout(() => {
      this.setState(prevState => ({btnProcessing: !prevState.btnProcessing}));
    }, 100);
  }

  render() {
    if (this.props.auth) {
      return <Redirect to="/user" />
    }

    const { btnProcessing } = this.state;

    return (
      <div className="landing-page">
        <div className="title">
          <b>
            hello, this is a landing page <span>👋</span>
          </b>
        </div>

        <div className="demo">
          <div className="demo-btn-container">
            <button className="demo-btn" ref={this.demoBtn} onClick={this.handleClick} processing={`${btnProcessing ? 'true' : 'false'}`}>
              this is a button
              <div className="ripple"
                ref={this.btnRipple}
                active={`${this.state.button_ripple}`}
                style={{top: this.state.rippleTop, left: this.state.rippleLeft}}>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Home);