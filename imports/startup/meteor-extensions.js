import {Meteor} from 'meteor/meteor';

Meteor.callPromise = (...params) => {
    return new Promise((resolve, reject) => {
        Meteor.call(...params, (err, res) => {
            if (err) {
                return reject(err);
            }

            return resolve(res);
        });
    });
};
