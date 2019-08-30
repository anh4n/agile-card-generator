import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import PageHeader from 'antd/lib/page-header';

import { LocationContext } from './LocationContext';

const StyledPageHeader = styled(PageHeader)`
    padding: 0;
`;

const BackPageHeader = (props) => {
    const { pathname } = useContext(LocationContext);
    const { to, history, match, location, staticContext, ...restProps } = props;

    return (
        <StyledPageHeader {...restProps} onBack={() => history.push(pathname)} />
    );
};

BackPageHeader.defaultProps = {
};

BackPageHeader.propTypes = {
};

export default withRouter(BackPageHeader);
