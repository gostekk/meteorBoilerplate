import { Meteor } from 'meteor/meteor';

import { News } from '../news';

Meteor.publish('news', function news() {
  return News.find();
});
