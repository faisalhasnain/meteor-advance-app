import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';

import GuestLayout from '../../ui/layouts/GuestLayout.jsx';
import UserLayoutContainer from '../../ui/layouts/UserLayoutContainer.jsx';

const GUEST_ROUTES = ['signin'];

Accounts.onLogin(() => {
  if (GUEST_ROUTES.includes(FlowRouter.getRouteName())) {
    FlowRouter.go('/');
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
    redirect('/');
  }
}], { only: GUEST_ROUTES });

FlowRouter.route('/signin', {
  name: 'signin',
  action() {
    mount(GuestLayout, { page: <Signin /> });
  }
});

FlowRouter.route('/', {
  name: 'transactions',
  action() {
    mount(UserLayoutContainer, { page: <TransactionsContainer /> });
  }
});
