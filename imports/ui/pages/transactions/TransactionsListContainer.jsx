import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Transactions } from '/imports/api/transactions/collection';
import TransactionsList from './TransactionsList.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      transactions: []
    };
    this.subHandle = Meteor.subscribe('Transactions.list', {
      onStop: (err) => {
        if (err) {
          this.setState({ loading: false, error: err.reason || err.message });
        }
      },
      onReady: () => {
        this.autorunComp = Tracker.autorun(() => {
          const transactions = Transactions.find({}, {
            sort: { createdAt: 1 },
            transform(transaction) {
              return {
                createdAt: transaction.createdAt.toLocaleString(),
                description: transaction.description,
                debit: transaction.type === 'Debit',
                credit: transaction.type === 'Credit',
                amount: transaction.amount.toLocaleString()
              };
            }
          }).fetch();
          const credits = Transactions.find({ type: 'Credit' }, { fields: { amount: 1 } }).fetch().map(t => t.amount).reduce((total, val) => total + val, 0);
          const debits = Transactions.find({ type: 'Debit' }, { fields: { amount: 1 } }).fetch().map(t => t.amount).reduce((total, val) => total + val, 0);
          const balance = credits - debits;
          const { currency } = Meteor.user().profile;
          this.setState({ loading: false, transactions, balance, currency });
        });
      }
    });
  }
  componentWillUnmount() {
    if (this.subHandle) this.subHandle.stop();
    if (this.autorunComp) this.autorunComp.stop();
  }
  render() {
    return <TransactionsList {...this.props} {...this.state} />;
  }
}
