import React from 'react';
import { Meteor } from 'meteor/meteor';

import 'bulma/css/bulma.css';

export default class UserLayout extends React.Component {
  signout = () => Meteor.logout();
  render() {
    return (
      <div>
        <nav className="navbar is-light">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <h5 className="subtitle is-3 has-text-primary">Meteor Basic App</h5>
            </a>
            <div className="navbar-burger burger" data-target="navMenubd-example">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div id="navMenubd-example" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item is-active" href="/">
                <span className="icon">
                  <i className="" />
                </span>
                &nbsp;
                <span>
                  Transactions
                </span>
              </a>
            </div>

            <div className="navbar-end">
              <span className="navbar-item is-hidden-desktop-only" href="#">
                <p className="control">
                  <span className="icon is-small">
                    <i className="fa fa-user" />
                  </span>
                  &nbsp;
                  <span className="is-size-6">
                    {this.props.user.firstName}
                  </span>
                  &nbsp;
                  <span className="is-size-7 has-text-grey">
                    {this.props.user.email}
                  </span>
                </p>
              </span>
              <div className="navbar-item">
                <p className="control">
                  <button type="button" className="button is-warning" onClick={this.signout}>
                    <span className="icon">
                      <i className="fa fa-sign-out" />
                    </span>
                    <span>
                      Sign Out
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </nav>
        <hr className="is-marginless" />
        <section className="section is-small">
          <div className="container-fluid">
            {this.props.page}
          </div>
        </section>
      </div>
    );
  }
}
