import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { isEmpty } from '../tools/helpers';
import { setAuth } from '../actions';
import * as Yup from 'yup';
import axios from 'axios';

import '../styles/sass/4-components/loginForm.scss';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('required'),
  password: Yup.string().required('required')
})

class LoginForm extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      usernameAuthError: null,
    }
  }

  handleSubmit = async values => {
    try {
      const res = await axios.post('/api/login', values);
      await this.props.setAuth(res.data);
      this.props.loginCallback();

    } catch (error) {
      console.error(error);
      if (error.response.data) {
        const { data } = error.response;

        if (data === 'invalid_username') {
          this.setState(() => ({ usernameAuthError: 'Invalid username' }));
        }
      }

      else console.error(error);
    }
  }

  render() {
    const { usernameAuthError } = this.state;

    return (
      <div>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={this.handleSubmit}
        >
          {({ errors, touched, isSubmitting, dirty, handleChange }) => {
            return <Form className="login-form">
              <div className="login-title">Login with username</div>

              <div>Username</div>
              <Field onChange={e => {
                this.setState(() => ({ usernameAuthError: null }));
                handleChange(e);}}
                name="username"
                type="text"
                autoComplete="off"
                error={usernameAuthError ? 'true' : 'false'} />
              <div className="error-message" triggered={usernameAuthError ? 'true' : 'false'}>
                {usernameAuthError}
              </div>

              <div>Password</div>
              <Field name="password" type="password" autoComplete="off" />
              <div className="error-message"></div>

              <button className="btn-primary" type="submit" disabled={!isEmpty(errors) || !dirty}>
                Login
              </button>
            </Form> }}
        </Formik>
      </div>
    )
  }
}

export default connect(null, { setAuth })(LoginForm);