import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Display = styled.div`
    font-size: 64px;
    text-align: center;
`;

/**
 * @return {React.Component}
 */
export const NotFound = () => {
    return (
        <Display>404 Not Found</Display>
    );
};

NotFound.defaultProps = {};

NotFound.propTypes = {};
