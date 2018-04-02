import React from 'react';
import { Accounts } from 'meteor/accounts-base'

class UserChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      oldPass: '',
      newPass: '',
      reNewPass: '',
    };
    this.onOldPassChange = this.onOldPassChange.bind(this);
    this.onNewPassChange = this.onNewPassChange.bind(this);
    this.onRePassChange = this.onRePassChange.bind(this);
  }

  onSubmit (e) {
    e.preventDefault();

    const oldPass = this.state.oldPass.trim();
    const newPass = this.state.newPass.trim();
    const reNewPass = this.state.reNewPass.trim();

    if (oldPass.length < 1) {
      return this.setState({ error: 'Insert old password'});
    }

    if (!(newPass === reNewPass)) {
      return this.setState({ error: 'Passwords are not identical!', newPass: '', reNewPass: ''});
    }

    if (newPass.length < 9) {
      return this.setState({ error: 'Password must me more than 8 characters long.', newPass: '', reNewPass: '' });
    }

    if ( oldPass === newPass) {
      return this.setState({ error: 'Password must be diferent from the old one', newPass: '', reNewPass: ''});
    }

    Accounts.changePassword(oldPass, newPass, (err) => {
      if (err) {
        this.setState({
          error: err.reason,
          oldPass: '',
          newPass: '',
          reNewPass: '',
        })
      } else {
        this.setState({
          error: '',
          oldPass: '',
          newPass: '',
          reNewPass: '',
        });
      }
    });
  }

  onOldPassChange(e) {
    this.setState({
      oldPass: e.target.value,
    });
  }

  onNewPassChange(e) {
    this.setState({
      newPass: e.target.value,
    });
  }

  onRePassChange(e) {
    this.setState({
      reNewPass: e.target.value,
    });
  }

  render () {
    return (
      <div>
        <h3>Change Password</h3>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input
            type="password"
            ref={ref => this.oldPass = ref}
            name="oldPass"
            placeholder="Old password"
            value={ this.state.oldPass }
            onChange={ this.onOldPassChange }
          />
          <input
            type="password"
            ref={ref => this.newPass = ref}
            name="newPass"
            placeholder="New password"
            value={ this.state.newPass }
            onChange={ this.onNewPassChange }
          />
          <input
            type="password"
            ref={ref => this.reNewPass = ref}
            name="reNewPass"
            placeholder="Repeat new password"
            value={ this.state.reNewPass }
            onChange={ this.onRePassChange }
          />
          <button className="button">Change</button>
        </form>
      </div>
    );
  }
}

export default UserChangePassword;
