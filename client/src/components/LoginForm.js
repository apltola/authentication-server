import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { isEmpty } from '../tools/helpers';
import * as Yup from 'yup';

import '../styles/sass/4-components/loginForm.scss';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('required'),
  password: Yup.string().required('required')
})

export default class LoginForm extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {

    }
  }

  handleSubmit = async values => {

  }

  render() {
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
              <Field name="username" type="text" autoComplete="off" />

              <div>Password</div>
              <Field name="password" type="password" autoComplete="off" />

              <button className="btn-primary" type="submit" disabled={!isEmpty(errors) || !dirty}>
                Login
              </button>
            </Form> }}
        </Formik>
      </div>
    )
  }
}
