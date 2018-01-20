import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Transactions } from './collection.js';

Meteor.methods({
  'Transactions.insert'(transaction) {
    check(transaction, Object);
    if (!this.userId) {
      throw new Meteor.Error('accessDenied', 'You are not allowed to perform this operation');
    }
    return Transactions.insert(transaction);
  },
  'Transactions.remove'(id) {
    check(id, String);
    if (!this.userId) {
      throw new Meteor.Error('accessDenied', 'You are not allowed to perform this operation');
    }
    return Transactions.remove(id);
  }
});
