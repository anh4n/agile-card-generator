import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import PageHeader from 'antd/lib/page-header';

const StyledPageHeader = styled(PageHeader)`
    padding: 0 0 16px 0;
`;

const BackPageHeader = (props) => {
    const { to, history, match, location, staticContext, ...restProps } = props;

    return (
        <StyledPageHeader {...restProps} onBack={() => history.goBack()} />
    );
};

BackPageHeader.defaultProps = {
};

BackPageHeader.propTypes = {
};

export default withRouter(BackPageHeader);
