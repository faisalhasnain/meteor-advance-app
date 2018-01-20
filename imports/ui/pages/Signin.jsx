import { Meteor } from 'meteor/meteor';
import React from 'react';

import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
      if (err) {
        this.setState({
          loading: false,
          error: err.reason
        });
      } else {
        // Meteor will auto login and redirect to home route;
      }
    });
  }
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  render() {
    if (this.state.loading) {
      return <Loading message="Signing In ..." />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className="subtitle is-4">Sign In</h3>
        {this.state.error ? <ErrorMessage error={this.state.error} /> : ''}
        <div className="field">
          <p className="control has-icons-left">
            <input name="email" className="input" type="email" placeholder="Email" required value={this.state.email} onChange={this.handleInputChange} />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input name="password" className="input" type="password" placeholder="Password" required value={this.state.password} onChange={this.handleInputChange} />
            <span className="icon is-small is-left">
              <i className="fa fa-lock" />
            </span>
          </p>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-primary">
              <span className="icon is-small">
                <i className="fa fa-check" />
              </span>
              <span>
              Sign In
              </span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}
