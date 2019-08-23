import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { TeamsCollection } from '../../../api/teams/teamsCollection';
import { StyledCard } from '../lib/StyledComponents';
import BackPageHeader from '../lib/BackPageHeader';
import { TeamEditGrid } from '../Main/TeamEditGrid';

/**
 * @return {React.Component}
 */
const TeamEdit = (props) => {
    const { teams } = props;

    return (
        <StyledCard>
            <BackPageHeader title="Teams" />
            <TeamEditGrid data={teams} />
        </StyledCard>
    );
};

TeamEdit.defaultProps = {};

TeamEdit.propTypes = {};

export default withTracker(() => {
    Meteor.subscribe('teams');

    return {
        teams: TeamsCollection.find({}, { 'sort': { 'name': 1 } }).fetch(),
    };
})(TeamEdit);
