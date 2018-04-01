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
      </div>
    );
  }
}

export default Index;
