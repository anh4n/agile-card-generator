import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

const {
    PROXY_URL,
    JIRA_API_URL,
    JIRA_USERNAME,
    JIRA_PASSWORD
} = process.env;

const options = {
    auth: `${JIRA_USERNAME}:${JIRA_PASSWORD}`,
    headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
    },
    npmRequestOptions: {
        proxy: PROXY_URL
    }
};

Meteor.methods({
    'jira.get.sprints'(boardId) {
        return HTTP.get(`${JIRA_API_URL}/board/${boardId}/sprint?state=active,future`, options);
    },

    'jira.get.issues'(boardId, sprintId) {
        return HTTP.get(`${JIRA_API_URL}/sprint/${sprintId}/issue?maxResults=150`, options);
    }
});
