import React from 'react';
import { Meteor } from 'meteor/meteor';

import 'bulma/css/bulma.css';

export default class UserLayout extends React.Component {

  getNavItems() {
    if (this.props.user.isAdmin) {
      return [
        {
          title: 'Platforms', routes: ['listPlatforms', 'insertPlatform', 'editPlatform'], path: '/platforms', icon: 'fa fa-facebook-official'
        },
        {
          title: 'Master Tasks', routes: ['listMasterTasks', 'insertMasterTask', 'editMasterTask'], path: '/master-tasks', icon: 'fa fa-database'
        },
        {
          title: 'Groups', routes: ['listGroups', 'insertGroup', 'editGroup'], path: '/groups', icon: 'fa fa-users'
        },
        {
          title: 'Users', routes: ['listUsers', 'insertUser', 'editUser'], path: '/users', icon: 'fa fa-user'
        }
      ];
    } else {
      return [
        {
          title: 'My Tasks', routes: ['listMyTasks', 'insertMyTask', 'editMyTask'], path: '/my-tasks', icon: 'fa fa-list'
        },
        {
          title: 'Group Tasks', routes: ['listGroupTasks', 'insertGroupTask', 'editGroupTask'], path: '/group-tasks', icon: 'fa fa-database'
        }
      ];
    }
  }

  isActiveNav = routes => routes.includes(this.props.routeName);

  signout = () => Meteor.logout();

  render() {
    return (
      <div>
        <nav className="navbar is-light">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="/logo.png" alt="WebDrvn" width="112" height="28" />
              &nbsp;&nbsp;
              <h5 className="subtitle is-3 has-text-primary">Snap</h5>
            </a>
            <div className="navbar-burger burger" data-target="navMenubd-example">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div id="navMenubd-example" className="navbar-menu">
            <div className="navbar-start">
              {this.getNavItems().map(navItem => (
                <a key={navItem.path} className={`navbar-item ${(this.isActiveNav(navItem.routes) ? ' is-active' : '')}`} href={navItem.path}>
                  <span className="icon">
                    <i className={navItem.icon} />
                  </span>
                  &nbsp;
                  <span>
                    {navItem.title}
                  </span>
                </a>
              ))}
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
