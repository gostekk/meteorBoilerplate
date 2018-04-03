import React from 'react';
import { Accounts } from 'meteor/accounts-base'

class UserChangeUsername extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      username: Meteor.user().username,
    };
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  onSubmit (e) {
    e.preventDefault();

    const username = this.state.username.trim();

    if (username.length < 5) {
      return this.setState({ error: 'Username must have at least 5 characters.'});
    }

    if ( username === Meteor.user().username) {
      return this.setState({ error: 'Username must be diferent from the old one', username: ''});
    }

    Meteor.call('user.changeUsername', this.props.userId, username, (err) => {
      if (err) {
        this.setState({
          error: err.reason,
          username: '',
        })
      } else {
        this.setState({
          error: '',
          username: username,
        });
      }
    });
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  render () {
    return (
      <div>
        <h3>Change username</h3>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input
            type="text"
            ref={ref => this.username = ref}
            name="username"
            placeholder="username"
            value={ this.state.username }
            onChange={ this.onUsernameChange }
          />
          <button className="button">Change username</button>
        </form>
      </div>
    );
  }
}

export default UserChangeUsername;
