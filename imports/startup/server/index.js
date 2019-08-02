import './register-api';
import '../meteor-extensions';

const checkEnv = (envVar) => {
    if (!process.env[envVar]) {
        throw `Environment variable "${envVar}" must be set`;
    }
};

checkEnv('JIRA_URL');
checkEnv('JIRA_API_URL');
checkEnv('JIRA_USERNAME');
checkEnv('JIRA_PASSWORD');
