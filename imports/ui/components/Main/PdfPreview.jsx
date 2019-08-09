import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import pdfMake from 'pdfmake';
import 'pdfmake/build/vfs_fonts';

import { AgileCards } from '../../lib/AgileCards';
import { handlebarsMapper } from '../../lib/jiraMapper';

export const PdfPreview = ({ value, boardId, isStory }) => {

    const [dataUrl, setDataUrl] = useState('');
    let issue = {};

    if(isStory) {
        issue = {
            key: 1,
            issuekey: 'JIRAISSUE-1',
            issuetype: 'Story',
            summary: 'Change all form colors',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            sprint: 'Sprint 1',
            epic: 'Corporate design change',
            storyPoints: '5',
            parent: {
                issuekey: null,
                summary: null
            }
        };
    } else {
        issue = {
            key: 2,
            issuekey: 'JIRAISSUE-2',
            issuetype: 'Technical task',
            summary: 'Change text color',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            sprint: 'Sprint 1',
            storyPoints: '2',
            parent: {
                issuekey: 'JIRAISSUE-1',
                summary: 'Change all form colors'
            }
        };
    }

    const issues = [issue];
    const issueTemplate = handlebarsMapper(issue, 0, issues, 'Team 1', value, value);
    const styles = AgileCards.getStyle(boardId);

    const docDefinition = {
        pageSize: 'A5',
        pageOrientation: 'landscape',
        pageMargins: 15,
        content: issueTemplate,
        styles
    };

    useEffect(() => {
        pdfMake.createPdf(docDefinition).getDataUrl(url => {
            setDataUrl(url)
        });
    }, [value]);

    return (
        <iframe width='100%' height='755px' src={dataUrl} />
    );
};

PdfPreview.defaultProps = {
    value: '',
    isStory: false
};

PdfPreview.propTypes = {
    value: PropTypes.string,
    boardId: PropTypes.number,
    isStory: PropTypes.bool
};


