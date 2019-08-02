import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Form from 'antd/lib/form';

import TeamSelectBox from './TeamSelectBox';
import SprintList from './SprintList';
import { IssueTable } from './IssueTable';
import { createPDF } from '../../lib/PDF';
import { TeamsCollection } from '../../../api/teams/teamsCollection';


const Main = (props) => {
    const { boardId, sprintId, isSubscriptionReady, team } = props;

    if (!isSubscriptionReady) {
        return null;
    }

    const [selectedIssues, setSelectedIssues] = useState([]);
    const [jiraUrl, setJiraUrl] = useState('');

    useEffect(() => {
        Meteor.callPromise('get.env', 'JIRA_URL').then(url => {
            setJiraUrl(url);
        });
    });

    const isNoIssueSelected = () => selectedIssues.length === 0;

    const onDownloadClick = () => {
        const pdf = createPDF(boardId, selectedIssues, team.name);
        pdf.download();
    };

    const onOpenClick = () => {
        const pdf = createPDF(boardId, selectedIssues, team.name);
        pdf.open();
    };

    const onIssueSelectionChange = (selectedRowKeys, selectedRows) => {
        setSelectedIssues(selectedRows);
    };

    return (
        <Fragment>
            <Card
                headStyle={{ backgroundColor: '#e6f7ff' }}
                title={
                    <h1 style={{ margin: 0 }}><Icon type={'idcard'} /> Agile Card Generator</h1>
                }
                extra={'2.0.0'}
                actions={[
                    <Button disabled={isNoIssueSelected()} onClick={onDownloadClick}>Download PDF</Button>,
                    <Button disabled={isNoIssueSelected()} onClick={onOpenClick}>Open PDF in new Tab</Button>
                ]}
            >
                <Form layout={'vertical'}>
                    <Form.Item>
                        <legend>Team</legend>
                        <TeamSelectBox value={boardId} />
                    </Form.Item>
                    <Form.Item>
                        <legend>Sprints</legend>
                        <SprintList value={sprintId} boardId={boardId} />
                    </Form.Item>
                    <Form.Item>
                        <legend>Issues</legend>
                        <IssueTable onChange={onIssueSelectionChange} boardId={boardId} sprintId={sprintId} jiraUrl={jiraUrl}/>
                    </Form.Item>
                </Form>
            </Card>
        </Fragment>
    );
};

Main.defaultProps = {
    boardId: 0,
    sprintId: 0,
    team: {}
};

Main.propTypes = {
    boardId: PropTypes.number,
    sprintId: PropTypes.number,
    team: PropTypes.object
};

export default withTracker(({ boardId }) => {
    const handle = Meteor.subscribe('teams');

    return {
        isSubscriptionReady: handle.ready(),
        team: TeamsCollection.findOne({ boardId })
    };
})(Main);
