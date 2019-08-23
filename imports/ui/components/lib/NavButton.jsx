import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Button from 'antd/lib/button';

const NavButton = (props) => {
    const { to, history, match, location, staticContext, ...restProps } = props;

    return (
        <Button {...restProps} onClick={() => history.push(to)} />
    );
};

NavButton.defaultProps = {
    to: '/'
};

NavButton.propTypes = {
    to: PropTypes.string
};

export default withRouter(NavButton);
