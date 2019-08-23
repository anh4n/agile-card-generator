import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import Main from '../components/Main/Main';

export const MainPage = (props) => {
    const { match, location } = props;

    const { boardId = "0", sprintId = "0" } = match.params;

    if ('/' === location.pathname) {
        return (<Redirect to='/print' />);
    }

    return (
        <Main boardId={parseInt(boardId)} sprintId={parseInt(sprintId)} />
    );
};

MainPage.defaultProps = {};

MainPage.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
};

