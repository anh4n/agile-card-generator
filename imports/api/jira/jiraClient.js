import {Meteor} from 'meteor/meteor';

const getSprints = async (boardId) => {
    return await Meteor.callPromise('jira.get.sprints', boardId);
};

const getIssues = async (boardId, sprintId) => {
    return await Meteor.callPromise('jira.get.issues', boardId, sprintId);
};

export const JiraClient = {
    getSprints,
    getIssues
};
