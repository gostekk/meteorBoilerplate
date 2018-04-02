import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavigationUser = () => {
  return (
    <nav>
      <div>
        <NavLink to="/app" exact activeClassName="selected">
          <button>
            Home
          </button>
        </NavLink>

        <NavLink to="/users" activeClassName="selected">
          <button>
            Users
          </button>
        </NavLink>
      </div>
      
      <div className="pull-right">
        <button onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </nav>
  );
}

export default NavigationUser;
