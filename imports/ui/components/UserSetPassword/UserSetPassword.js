import React from 'react';
import { Accounts } from 'meteor/accounts-base'

class UserSetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      newPass: '',
    };
    this.onNewPassChange = this.onNewPassChange.bind(this);
  }

  onSubmit (e) {
    e.preventDefault();

    const newPass = this.state.newPass.trim();

    if (newPass.length < 9) {
      return this.setState({ error: 'Password must me more than 8 characters long.', newPass: '', reNewPass: '' });
    }

    Meteor.call('user.setPassword', this.props.id, newPass, (err) => {
      if (err) {
        this.setState({
          error: err.reason,
          newPass: '',
        })
      } else {
        this.setState({
          error: '',
          newPass: '',
        });
      }
    });
  }

  onNewPassChange(e) {
    this.setState({
      newPass: e.target.value,
    });
  }

  render () {
    return (
      <div>
        <h3>Set new Password</h3>

        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
        <input
          type="password"
          ref={ref => this.newPass = ref}
          name="newPass"
          placeholder="New password"
          value={ this.state.newPass }
          onChange={ this.onNewPassChange }
        />
        <button className="button">Change</button>
      </form>
      </div>
    );
  }
}

export default UserSetPassword;
