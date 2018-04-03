import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavigationUser = () => {
  return (
    <nav>
      <div>
        <NavLink to="/admin" activeClassName="selected">
          <button>
            Admin
          </button>
        </NavLink>

        <NavLink to="/adduser" activeClassName="selected">
          <button>
            AddUser
          </button>
        </NavLink>

        <NavLink to="/users" activeClassName="selected">
          <button>
            Users
          </button>
        </NavLink>
      </div>

      <div className="pull-right">
        <NavLink to="/app" exact activeClassName="selected">
          <button>
            Back
          </button>
        </NavLink>
      </div>
    </nav>
  );
}

export default NavigationUser;
