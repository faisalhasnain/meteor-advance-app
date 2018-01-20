import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseSchema from '/imports/utils/base-schema.js';

const profileSchema = new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  currency: {
    type: String
  }
});

const userSchema = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array,
    minCount: 1,
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  profile: {
    type: profileSchema,
  },
  groups: {
    type: Array,
    optional: true
  },
  'groups.$': {
    type: Object
  },
  'groups.$.id': {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  'groups.$.joinedAt': {
    type: Date
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Array,
    optional: true
  },
  'roles.$': {
    type: String
  }
}).extend(BaseSchema);

// Deny all client-side updates to user documents
Meteor.users.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Meteor.users.attachSchema(userSchema);
