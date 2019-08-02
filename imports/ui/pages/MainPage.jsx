import React from 'react';
import PropTypes from 'prop-types';

import Main from '../components/Main/Main';
import Col from 'antd/lib/grid/col';

export const MainPage = (props) => {

    const {boardId = "0", sprintId = "0"} = props.match.params;

    return (
        <Col xs={24} lg={{span: 18, offset: 3}} xl={{span: 12, offset: 6}}>
            <Main boardId={parseInt(boardId)} sprintId={parseInt(sprintId)}/>
        </Col>
    );
};

MainPage.defaultProps = {};

MainPage.propTypes = {
    match: PropTypes.object
};

