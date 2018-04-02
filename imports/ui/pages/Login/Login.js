import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      username: '',
      password: '',
    };
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const username = this.state.username.trim();
    const password = this.state.password.trim();

    this.props.loginWithPassword({ username }, password, (err) => {
      if (err) {
        if(err.reason === 'Incorrect password') {
          this.setState({ error: err.reason, password: '' });
        } else {
          this.setState({ error: err.reason, username: '', password: '' });
        }
      } else {
        if (Roles.userIsInRole(Meteor.userId(), 'delete')){
          Meteor.logout();
        }
        this.setState({ error: '', username: '', password: '' });
      }
    });
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value,
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
              type="text"
              ref={ref => this.loginUsername = ref}
              name="username"
              placeholder="Email"
              value={ this.state.username }
              onChange={ this.onUsernameChange }
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
