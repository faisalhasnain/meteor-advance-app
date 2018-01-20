import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';

import ErrorMessage from '../../components/ErrorMessage.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: {
        description: '', type: 'Debit', amount: ''
      },
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    try {
      if (this.props.routeName === 'insertTransaction') {
        const id = await Meteor.callAsync('Transactions.insert', this.state.transaction);
        console.log('Inserted', id);
      }
      FlowRouter.go('/transactions');
    } catch (error) {
      this.setState({ error: error.reason });
    }
  }
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      transaction: { ...this.state.transaction, [name]: value }
    });
  }
  render() {
    return (
      <div className="columns">
        <div className="column is-offset-3 is-6">
          <h3 className="subtitle is-4"><i className={this.props.page.icon} /> {this.props.page.title}</h3>
          <hr />
          {this.state.error ? <ErrorMessage error={this.state.error} /> : ''}
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Type</label>
              <div className="control">
                <label className="radio" htmlFor="type1">
                  <input id="type1" name="type" type="radio" value="Debit" checked={this.state.transaction.type === 'Debit'} onChange={this.handleInputChange} /> Debit
                </label>
                <label className="radio" htmlFor="type2">
                  <input id="type2" name="type" type="radio" value="Credit" checked={this.state.transaction.type === 'Credit'} onChange={this.handleInputChange} /> Credit
                </label>
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div>
                <input name="description" className="input" type="text" placeholder="Description" required value={this.state.transaction.description} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">Amount</label>
              <div>
                <input name="amount" className="input" type="number" placeholder="Amount" required value={this.state.transaction.amount} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="space-block" />
            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className="button is-primary">
                  <span className="icon">
                    <i className="fa fa-check" />
                  </span>
                  <span>Save</span>
                </button>
              </div>
              <div className="control">
                <a href="/transactions" className="button">
                  <span className="icon">
                    <i className="fa fa-close" />
                  </span>
                  <span>Cancel</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
