import {Meteor} from 'meteor/meteor';
import {TeamsCollection} from './teamsCollection';

Meteor.methods({
    /**
     * @param {Object[]} data
     */
    'teams.upsert'(data) {
        data.forEach((doc) => {
            let id = doc._id;
            delete doc._id;

            TeamsCollection.upsert(id, doc);
        });
    },
    /**
     * @param {Object} doc
     */
    'team.upsert'(doc) {
        let id = doc._id;
        delete doc._id;

        TeamsCollection.upsert(id, doc);
    },
    /**
     * @param {string} id
     */
    'team.delete'(id) {
        TeamsCollection.remove(id);
    }
});
