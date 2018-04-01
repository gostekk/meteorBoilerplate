import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: '',
      repassword: '',
      nameDisplayed: '',
      admin: true,
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const repassword = this.state.repassword.trim();

    const admin = this.state.admin ? false : true;

    if (!(password === repassword)) {
      return this.setState({ error: 'Passwords are not identical!', password: '', repassword: ''})
    }

    if (password.length < 9) {
      return this.setState({ error: 'Password must me more than 8 characters long.', password: '' })
    }

    const profile = {
      nameDisplayed : this.state.nameDisplayed.trim(),
    };

    const roles = {
      admin,
    };

    Meteor.call('user.add', {email, password, profile}, roles, (err, res) => {
      if (err) {
        this.setState({
          error: err.reason,
          password: '',
          repassword: '',
        });
      } else {
        this.setState({
          error: '',
          email: '',
          password: '',
          repassword: '',
          nameDisplayed: '',
          admin: true,
        });
        console.log('User added');
      }
    });
  }

  render () {
    return (
      <div>
        <div>
          <h1>Join</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <input
              type="email"
              ref="email"
              name="email"
              placeholder="Email"
              value={ this.state.email }
              onChange={ (e) => this.setState({email: e.target.value}) }
            />
            <input
              type="password"
              ref="password"
              name="password"
              placeholder="Password"
              value={ this.state.password }
              onChange={ (e) => this.setState({password: e.target.value}) }
            />
            <input
              type="password"
              ref="repassword"
              name="repassword"
              placeholder="Password confirm"
              value={ this.state.repassword }
              onChange={ (e) => this.setState({repassword: e.target.value}) }
            />
            <input
              type="text"
              ref="nameDisplayed"
              name="nameDisplayed"
              placeholder="Name displayed"
              value={ this.state.nameDisplayed }
              onChange={ (e) => this.setState({nameDisplayed: e.target.value}) }
            />
            <label>
              <input
                type="checkbox"
                ref="admin"
                name="admin"
                checked={ !this.state.admin }
                onChange={ (e) => this.setState({admin: !e.target.checked})}
              />
              Admin
            </label>
            <button>Create Account</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddUser;
