import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { setAuth } from '../actions';
import { isEmpty } from '../helpers/helpers';
import * as Yup from 'yup';
import axios from 'axios';
import '../styles/sass/components/AuthForms.scss';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('invalid email').required('email required!'),
  username: Yup.string().required('pick a username!'),
  password: Yup.string().required('you must have a password!'),
  confirmPassword: Yup.string().required('confirm your goddamn password!!')
})

class RegisterForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      emailAuthError: '',
      usernameAuthError: '',
      passwordMismatch: false,
    }
  }

  handleSubmit = async values => {
    if (values.password !== values.confirmPassword) {
      return this.setState({ passwordMismatch: true });
    } else {
      this.state.passwordMismatch ? this.setState(() => ({ passwordMismatch: false })) : null;
    }

    try {
      const res = await axios.post('/api/register', values);
      this.props.setAuth(res.data);
      this.props.registerCallback();
    } catch(error) {
      if (error.response.data) {
        const { data } = error.response;

        if (data === 'username_taken') {
          this.setState(() => ({ usernameAuthError: 'This username is already taken' }));
        }

        else if (data === 'email_taken') {
          this.setState(() => ({ emailAuthError: 'This email is already registered' }))
        }

        else if (data === 'username_and_email_taken') {
          this.setState(() => {
            return {
              usernameAuthError: 'This username is already taken',
              emailAuthError: 'This email is already registered'
            }
          })
        }
      }

      else {
        console.error(error)
      }
    }
  }

  render() {
    const { passwordMismatch, usernameAuthError, emailAuthError } = this.state;
    
    return (
      <div>
        <Formik
          initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
          onSubmit={this.handleSubmit}
        >
          {({values, errors, touched, isSubmitting, dirty, handleReset, handleChange }) => {
            return <Form className="register-form">
              <div>Email</div>
              <Field onChange={e => {
                if (emailAuthError) { this.setState(() => ({ emailAuthError: null }))}
                if (isSubmitting) { isSubmitting = false }
                handleChange(e); }}
                name="email"
                type="email"
                error={(errors.email && touched.email) || emailAuthError ? 'true' : 'false'}
              />
              <div className="error-message" triggered={(errors.email && touched.email) || emailAuthError ? 'true' : 'false'}>
                {errors.email}{emailAuthError}
              </div>

              <div>Username</div>
              <Field onChange={e => {
                if (usernameAuthError) { this.setState(() => ({ usernameAuthError: null }))}
                if (isSubmitting) { isSubmitting = false }
                handleChange(e); }}
                name="username"
                type="text"
                error={(errors.username && touched.username) || usernameAuthError ? 'true' : 'false'}
              />
              <div className="error-message" triggered={(errors.username && touched.username) || usernameAuthError ? 'true' : 'false'}>
                {errors.username}{usernameAuthError}
              </div>

              <div>Password</div>
              <Field name="password" type="password" error={((errors.password && touched.password) || passwordMismatch) ? 'true' : 'false'} />
              <div className="error-message" triggered={((errors.password && touched.password) || passwordMismatch) ? 'true' : 'false'}>{passwordMismatch ? 'your passwords don\'t match!' : errors.password}</div>

              <div>Confirm password</div>
              <Field name="confirmPassword" type="password" error={((errors.confirmPassword && touched.confirmPassword) || passwordMismatch) ? 'true' : 'false'} />
              <div className="error-message" triggered={((errors.confirmPassword && touched.confirmPassword) || passwordMismatch) ? 'true' : 'false'}>{passwordMismatch ? 'your passwords don\'t match!' : errors.confirmPassword}</div>

              <div className="register-button-container">
                <button className="register-submit"
                  type="submit"
                  disabled={!isEmpty(errors) || !dirty}>
                  submit
                </button>
                <button className="register-reset"
                  type="button"
                  onClick={handleReset}
                  disabled={!dirty}>
                  reset
                </button>
              </div>
            </Form>}}
        </Formik>
      </div>
    )
  }
}

export default connect(null, { setAuth })(RegisterForm)