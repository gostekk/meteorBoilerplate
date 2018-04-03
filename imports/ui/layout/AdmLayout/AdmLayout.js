import React from 'react';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';

const NavLayout = props => (
  <div>
    <NavigationAdmin {...props.children.props}/>
    {props.children}
  </div>
)

export default NavLayout;
