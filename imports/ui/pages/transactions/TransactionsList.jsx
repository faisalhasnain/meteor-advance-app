import { Meteor } from 'meteor/meteor';
import React from 'react';

import { showConfirm } from '../../components/Confirm.jsx';
import Loading from '../../components/Loading.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';

export default class extends React.Component {
  removeTransaction = async (transaction) => {
    const ans = await showConfirm({
      containerId: 'confirm-container',
      title: 'Confirm Delete?',
      message: `Do you really want to delete ${transaction.description} from Transactions?`
    });
    if (!ans) return;
    try {
      const removed = await Meteor.callAsync('Transactions.remove', transaction._id);
      console.log('Removed', removed);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    if (this.props.error) {
      return <ErrorMessage error={this.props.error} />;
    }
    return (
      <div>
        <div className="actions">
          <a href="/transactions/insert" className="button is-primary">
            <span className="icon">
              <i className="fa fa-plus" />
            </span>
            <span>Add Transaction</span>
          </a>
        </div>
        <div className="space-block" />
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>DateTime</th>
              <th>Description</th>
              <th>Debit</th>
              <th>Credit</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.transactions.map(transaction => (
              <tr key={transaction._id}>
                <td>{transaction.createdAt.toLocaleString()}</td>
                <td>{transaction.description}</td>
                <td>{transaction.debit ? transaction.amount : ''}</td>
                <td>{transaction.credit ? transaction.amount : ''}</td>
                <td>
                  <button className="button is-small is-danger" onClick={() => this.removeTransaction(transaction)}>
                    <span className="icon">
                      <i className="fa fa-times" />
                    </span>
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="space-block" />
        <span className="tag is-rounded is-success is-large has-text-centered">Balance: {this.props.balance.toLocaleString()}&nbsp;{this.props.currency}</span>
        <div id="confirm-container" />
      </div>
    );
  }
}
