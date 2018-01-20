import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import BaseSchema from '../../utils/base-schema';

export const Transactions = new Mongo.Collection('transactions');

const TransactionsSchema = new SimpleSchema({
  description: {
    type: String
  },
  type: {
    type: String,
    allowedValues: ['Debit', 'Credit']
  },
  amount: {
    type: Number
  }
}).extend(BaseSchema);

Transactions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Transactions.attachSchema(TransactionsSchema);
