import React from 'react';
import { Link } from 'react-router-dom';

class Index extends React.Component {
  render () {
    return (
      <div>
        Index
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
        <br />
        <Link to="/users">Users</Link>
        <br />
        <Link to="/account">MyAccount</Link>
        <br />
        <a nohref="true" onClick={() => Accounts.logout()}>Logout</a>
      </div>
    );
  }
}

export default Index;
