import Handlebars from './Handlebars';
import { isJsonString } from './jsonHelper';

export const handlebarsMapper = (issue, index, arr, teamName, storyTemplateString, taskTemplateString) => {

    const templateString = isTechnicalTask(issue.issuetype) ? taskTemplateString : storyTemplateString;
    const pageBreak = (index + 1 < arr.length) ? 'after' : 'none';

    let compiledTemplate;

    try {
        compiledTemplate = Handlebars.compile(templateString)({
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
    } catch(err) {
        console.error(err);
        return {
            text: `Syntax ERROR in Template (${issue.issuekey})`,
            fontSize: 30,
            alignment: 'center',
            color: '#ff0000',
            pageBreak
        };
    }

    const isValidJson = isJsonString(null, compiledTemplate);

    if (!isValidJson) {
        return {
            text: `Syntax ERROR in Template (${issue.issuekey})`,
            fontSize: 30,
            alignment: 'center',
            color: '#ff0000',
            pageBreak
        };
    }

    const template = JSON.parse(compiledTemplate);
    template.pageBreak = pageBreak;

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
        return 'Story: ' + parentIssue.issuekey + ' - ' + getText(parentIssue.summary);
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

const getText = (text = '') => {
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
