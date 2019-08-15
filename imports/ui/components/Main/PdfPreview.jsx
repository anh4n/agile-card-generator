import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import pdfMake from 'pdfmake';
import 'pdfmake/build/vfs_fonts';

import { handlebarsMapper } from '../../lib/jiraMapper';
import { isJsonString } from '../../lib/jsonHelper';

export const PdfPreview = ({ value, styles, boardId, isStory }) => {

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
    let issueTemplate = handlebarsMapper(issue, 0, issues, 'Team 1', value, value);
    let templateStyles = {};
    const isValidJson = isJsonString(null, styles);

    if (!isValidJson) {
        issueTemplate ={
            text: 'Syntax ERROR in Styles',
            fontSize: 30,
            alignment: 'center',
            color: '#ff0000'
        };
    } else {
        templateStyles = JSON.parse(styles);
    }

    const docDefinition = {
        pageSize: 'A5',
        pageOrientation: 'landscape',
        pageMargins: 15,
        content: issueTemplate,
        styles: templateStyles
    };

    useEffect(() => {
        pdfMake.createPdf(docDefinition).getDataUrl(url => {
            setDataUrl(url)
        });
    }, [value, styles]);

    return (
        <iframe width='100%' height='815px' src={dataUrl} />
    );
};

PdfPreview.defaultProps = {
    value: '',
    isStory: false
};

PdfPreview.propTypes = {
    value: PropTypes.string,
    styles: PropTypes.string,
    boardId: PropTypes.number,
    isStory: PropTypes.bool
};
