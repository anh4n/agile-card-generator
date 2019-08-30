import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { TeamsCollection } from '../../../api/teams/teamsCollection';
import { TeamEditGrid } from '../Main/TeamEditGrid';
import { EditComponent } from '../lib/EditComponent';

/**
 * @return {React.Component}
 */
const TeamEdit = (props) => {
    const { teams } = props;

    return (
        <EditComponent title="Teams" >
            <TeamEditGrid data={teams} />
        </EditComponent>
    );
};

TeamEdit.defaultProps = {};

TeamEdit.propTypes = {
    teams: PropTypes.array,
};

export default withTracker(() => {
    Meteor.subscribe('teams');

    return {
        teams: TeamsCollection.find({}, { 'sort': { 'name': 1 } }).fetch(),
    };
})(TeamEdit);
