import pdfMake from 'pdfmake';
import 'pdfmake/build/vfs_fonts';
import { AgileCards } from './AgileCards';
import { handlebarsMapper } from './jiraMapper';

export const createPDF = (boardId, issues, teamName) => {

    const {
        storyTemplate: storyTemplateString,
        taskTemplate: taskTemplateString
    } = AgileCards.getTemplates(boardId);
    const styles = AgileCards.getStyle(boardId);

    const issueTemplates = issues.map((issue, index, arr) => (
        handlebarsMapper(issue, index, arr, teamName, storyTemplateString, taskTemplateString)
    ));

    const docDefinition = {
        pageSize: 'A5',
        pageOrientation: 'landscape',
        pageMargins: 15,
        content: issueTemplates,
        styles
    };

    const date = new Date();

    const filename = `Issues_${teamName}_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}.pdf`;

    return {
        download: () => pdfMake.createPdf(docDefinition).download(filename),
        open: () => pdfMake.createPdf(docDefinition).open()
    };
};
