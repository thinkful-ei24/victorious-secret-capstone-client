import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { required, nonEmpty, length, isTrimmed } from '../validators';
const passwordLength = length({ min: 10, max: 72 });

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, email } = values;
    const user = { username, password, email };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <form
        className="landing-login-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <Field
          component={Input}
          type="text"
          name="email"
          placeholder="email"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <Field
          component={Input}
          type="text"
          name="username"
          placeholder="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <Field
          component={Input}
          type="password"
          name="password"
          placeholder="password"
          validate={[required, passwordLength, isTrimmed]}
        />
        <button
          className="landing-login-btn"
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
            Register
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
