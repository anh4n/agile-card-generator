import {Meteor} from 'meteor/meteor';

Meteor.methods({
    'get.env': (env) => {
        return process.env[env];
    }
});
