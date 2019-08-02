import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';

import { TeamsCollection } from '../../../api/teams/teamsCollection'
import { TeamEditModal } from './TeamEditModal';

const TeamSelectBox = (props) => {
    const { value, history, teams } = props;

    const options = teams.map(team => (
        <Select.Option key={team._id} value={team.boardId}>
            {team.name}
        </Select.Option>
    ));

    const onTeamChange = (value) => {
        history.push(`/${value}`);
    };

    return (
        <Input.Group compact>
            <Select
                value={value ? value : undefined}
                style={{ width: '300px' }}
                placeholder={'Choose Team'}
                onChange={onTeamChange}
            >
                {options}
            </Select>
            <TeamEditModal data={teams} />
        </Input.Group>
    );
};

TeamSelectBox.defaultProps = {
    value: 0,
    teams: []
};

TeamSelectBox.propTypes = {
    value: PropTypes.number,
    history: PropTypes.object,
    teams: PropTypes.array
};

export default withTracker(() => {
    Meteor.subscribe('teams');

    return {
        teams: TeamsCollection.find({}, { 'sort': { 'name': 1 } }).fetch(),
    };
})(withRouter(TeamSelectBox));
