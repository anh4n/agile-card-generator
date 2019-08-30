import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Button from 'antd/lib/button';

import { LocationContext } from './LocationContext';

const NavButton = (props) => {
    const {setPathName} = useContext(LocationContext);
    const { to, history, match, location, staticContext, ...restProps } = props;

    const onClick = () => {
        setPathName(location.pathname);
        history.push(to)
    };

    return (
        <Button {...restProps} onClick={onClick} />
    );
};

NavButton.defaultProps = {
    to: '/'
};

NavButton.propTypes = {
    to: PropTypes.string
};

export default withRouter(NavButton);
