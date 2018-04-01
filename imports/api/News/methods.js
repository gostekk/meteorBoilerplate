import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import { News } from './news';

Meteor.methods({
  'news.insert': function newsInsert(news) {
    new SimpleSchema({
      title: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      }
    }).validate({
      ...news,
    });

    try {
      return News.insert({ createdAt: new Date(), ...news });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },

  'news.remove': function newsRemove(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      }
    }).validate({
      _id
    });

    try {
      return News.remove(_id);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});
