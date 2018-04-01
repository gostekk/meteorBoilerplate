import React    from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import App from '../../ui/layout/App/App';

import '../both/api';

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
