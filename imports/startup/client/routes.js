import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';

import GuestLayout from '../../ui/layouts/GuestLayout.jsx';
import UserLayoutContainer from '../../ui/layouts/UserLayoutContainer.jsx';

import TransactionsListContainer from '../../ui/pages/transactions/TransactionsListContainer.jsx';
import InsertTransactionContainer from '../../ui/pages/transactions/InsertTransactionContainer.jsx';

import Signin from '../../ui/pages/guest/Signin.jsx';

const GUEST_ROUTES = ['signin'];
const HOME_ROUTE = '/transactions';

Accounts.onLogin(() => {
  if (GUEST_ROUTES.includes(FlowRouter.getRouteName())) {
    FlowRouter.go(HOME_ROUTE);
  }
});

Accounts.onLogout(() => {
  FlowRouter.go('/signin');
});

FlowRouter.triggers.enter([(context, redirect) => {
  if (!Meteor.userId()) {
    redirect('/signin');
  }
}], { except: GUEST_ROUTES });

FlowRouter.triggers.enter([(context, redirect) => {
  if (Meteor.userId()) {
    redirect(HOME_ROUTE);
  }
}], { only: GUEST_ROUTES });

FlowRouter.route('/signin', {
  name: 'signin',
  action() {
    mount(GuestLayout, { page: <Signin /> });
  }
});

FlowRouter.route('/transactions', {
  name: 'transactions',
  action() {
    mount(UserLayoutContainer, { page: <TransactionsListContainer /> });
  }
});

FlowRouter.route('/transactions/insert', {
  name: 'insertTransaction',
  action() {
    mount(UserLayoutContainer, { page: <InsertTransactionContainer routeName={FlowRouter.getRouteName()} /> });
  }
});
