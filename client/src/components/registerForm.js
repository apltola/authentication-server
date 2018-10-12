import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/sass/components/RegisterForm.scss';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('invalid email').required('email required!'),
  username: Yup.string().required('pick a username!'),
  password: Yup.string().required('you must have a password!'),
  confirmPassword: Yup.string().required('confirm your goddamn password!!')
})

export default class RegisterForm extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      passwordMismatch: false
    }
  }

  handleSubmit = values => {
    console.log({values});

    if (values.password !== values.confirmPassword) {
      this.setState({ passwordMismatch: true });
    } else {
      this.state.passwordMismatch ? this.setState({ passwordMismatch: false }) : null;
    }


  }

  render() {
    const { passwordMismatch } = this.state;

    return (
      <div>
        <Formik
          initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
          onSubmit={this.handleSubmit}
        >
          {({ errors, touched }) => {
            return <Form className="register-form">
              <div>Email</div>
              <Field name="email" type="email" error={errors.email && touched.email ? 'true' : 'false'} />
              <div className="error-message" triggered={errors.email && touched.email ? 'true' : 'false'}>{errors.email}</div>

              <div>Username</div>
              <Field name="username" type="text" error={errors.username && touched.username ? 'true' : 'false'} />
              <div className="error-message" triggered={errors.username && touched.username ? 'true' : 'false'}>{errors.username}</div>

              <div>Password</div>
              <Field name="password" type="password" error={((errors.password && touched.password) || passwordMismatch) ? 'true' : 'false'} />
              <div className="error-message" triggered={((errors.password && touched.password) || passwordMismatch) ? 'true' : 'false'}>{passwordMismatch ? 'your passwords don\'t match!' : errors.password}</div>

              <div>Confirm password</div>
              <Field name="confirmPassword" type="password" error={((errors.password && touched.password) || passwordMismatch) ? 'true' : 'false'} />
              <div className="error-message" triggered={((errors.password && touched.password) || passwordMismatch) ? 'true' : 'false'}>{passwordMismatch ? 'your passwords don\'t match!' : errors.password}</div>

              <button type="submit">create account</button>
            </Form>}}
        </Formik>
      </div>
    )
  }
}