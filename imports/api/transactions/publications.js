import { Meteor } from 'meteor/meteor';

import { Transactions } from './collection.js';

Meteor.publish('Transactions.list', function () {
  if (!this.userId) {
    throw new Meteor.Error('accessDenied', 'You are not allowed to see this information');
  }
  return Transactions.find({}, { fields: { description: 1, type: 1, amount: 1, createdAt: 1 } });
});
