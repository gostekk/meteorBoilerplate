import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password.trim();

    this.props.loginWithPassword({ email }, password, (err) => {
      if (err) {
        if(err.reason === 'Incorrect password') {
          this.setState({ error: err.reason, password: '' });
        } else {
          this.setState({ error: err.reason, email: '', password: '' });
        }
      } else {
        this.setState({ error: '', email: '', password: '' });
      }
    });
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render () {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input
              type="email"
              ref={ref => this.loginEmail = ref}
              name="email"
              placeholder="Email"
              value={ this.state.email }
              onChange={ this.onEmailChange }
            />
            <input
              type="password"
              ref={ref => this.loginPassword = ref}
              name="password"
              placeholder="Password"
              value={ this.state.password }
              onChange={ this.onPasswordChange }
            />
            <button className="button">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired,
};

export default withTracker(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword,
  }
})(Login);
