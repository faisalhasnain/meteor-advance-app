import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import UserLayout from './UserLayout.jsx';

export default withTracker(() => {
  const routeName = FlowRouter.getRouteName();
  const userInfo = Meteor.user();
  const loading = !userInfo;
  const user = loading ? {} : {
    firstName: userInfo.profile.firstName,
    lastName: userInfo.profile.lastName,
    email: userInfo.emails[0].address,
    isAdmin: !!(userInfo.roles && userInfo.roles.includes('admin'))
  };
  return {
    loading,
    user,
    routeName
  };
})(UserLayout);
