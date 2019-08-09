import Handlebars from './Handlebars';

export const handlebarsMapper = (issue, index, arr, teamName, storyTemplateString, taskTemplateString) => {

    const templateString = isTechnicalTask(issue.issuetype) ? taskTemplateString : storyTemplateString;

    const compiledTemplate = Handlebars.compile(templateString)({
        ISSUEKEY: issue.issuekey,
        SUMMARY: getText(issue.summary),
        ISSUETYPE: issue.issuetype,
        COMPONENTS: issue.components,
        SPRINT: issue.sprint,
        STORYPOINTS: new String(issue.storyPoints),
        TEAMNAME: teamName,
        ISSUETYPESTYLE: getIssueTypeStyle(issue.issuetype),
        DESCRIPTION: getText(issue.description),
        STORY_OR_EPIC_TEXT: getEpicOrStory(issue.epic, issue.parent)
    });

    const template = JSON.parse(compiledTemplate);

    if (index + 1 < arr.length) {
        template.pageBreak = 'after';
    }

    return template;
};

export const jiraIssueMapper = (({ id, key, fields }) => ({
    key: id,
    issuekey: key,
    issuetype: fields.issuetype.name,
    summary: fields.summary,
    description: fields.description,
    epic: fields.epic ? fields.epic.name : null,
    sprint: fields.sprint ? fields.sprint.name : '',
    components: fields.components,
    status: fields.status.name,
    storyPoints: fields.customfield_10002 ? fields.customfield_10002 : ' ',
    parent: {
        issuekey: fields.parent ? fields.parent.key : null,
        summary: fields.parent ? fields.parent.fields.summary : null
    }
}));

const getEpicOrStory = (epic, parentIssue) => {
    if (epic) {
        return 'Epic: ' + epic;
    } else if (parentIssue.issuekey) {
        return 'Story: ' + parentIssue.issuekey + ' - ' + parentIssue.summary;
    }

    return '';
};

const getIssueTypeStyle = (issuetype) => {

    switch (issuetype) {
        case 'Story':
            return 'storyCell';
            break;

        case 'Bug':
            return 'bugCell';
            break;

        case 'Epic':
            return 'epicCell';
            break;

        case 'Technical task':
            return 'technicalCell';
            break;

        default:
            return 'defaultIssueCell';
            break;
    }
};

const getText = (text) => {
    return text.trim()
        .replace(/[\\]/g, '\\\\')
        .replace(/[\"]/g, '\\\"')
        .replace(/[\/]/g, '\\/')
        .replace(/[\b]/g, '\\b')
        .replace(/[\f]/g, '\\f')
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '\\r')
        .replace(/[\t]/g, '\\t');
};

const isTechnicalTask = (issuetype) => (
    issuetype === 'Technical task'
);
