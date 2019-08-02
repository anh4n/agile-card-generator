import {Meteor} from 'meteor/meteor';

import {TeamsCollection} from './teamsCollection';

Meteor.publish('teams', function () {
    return TeamsCollection.find({});
});
