import React from 'react';

import NavigationUser from '../../components/NavigationUser/NavigationUser';

const NavLayout = props => (
  <div>
    <NavigationUser />
    {props.children}
  </div>
)

export default NavLayout;
