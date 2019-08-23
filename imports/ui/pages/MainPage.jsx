import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Col from 'antd/lib/grid/col';

import Main from '../components/Main/Main';

export const MainPage = (props) => {
    const {match, location} = props;

    const { boardId = "0", sprintId = "0" } = match.params;

    if ('/' === location.pathname) {
        return (<Redirect to='/print' />);
    }

    return (
        <Col xs={24} lg={{ span: 18, offset: 3 }} xl={{ span: 12, offset: 6 }}>
            <Main boardId={parseInt(boardId)} sprintId={parseInt(sprintId)} />
        </Col>
    );
};

MainPage.defaultProps = {};

MainPage.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
};

