import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

const NavigationUser = (props) => {
  return (
    <nav>
      <div>
        <NavLink to="/app" exact activeClassName="selected">
          <button>
            Home
          </button>
        </NavLink>

      </div>

      <div className="pull-right">
        { Roles.userIsInRole(props.userId, 'admin')
          ? (<NavLink to="/admin" activeClassName="selected">
            <button>
              Admin
            </button>
          </NavLink>)
          : undefined
        }

        <NavLink to="/account" activeClassName="selected">
          <button>
            My Account
          </button>
        </NavLink>

        <button onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </nav>
  );
}

export default NavigationUser;
