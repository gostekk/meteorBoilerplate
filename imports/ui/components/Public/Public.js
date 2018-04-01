import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Public = ({
  authenticated, component, path, exact, redirectPath, ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      !authenticated ?
        (React.createElement(component, {
          ...props, ...rest, authenticated,
        })) :
        (<Redirect to={redirectPath} />)
    )}
  />
);

Public.defaultProps = {
  path: '',
  exact: false,
};

Public.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
  redirectPath: PropTypes.string,
};

export default Public;
