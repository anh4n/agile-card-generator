import React from 'react';
import styled from 'styled-components';
import Menu from 'antd/lib/menu';
import { withRouter, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import { routes } from './routes';

const StyledMenu = styled(Menu)`
    background: transparent !important;
    line-height: 64px !important;
    display: inline-block;
`;

export const NavBar = (props) => {
    let activeRoute = '';

    routes.forEach(route => {
        const match = matchPath(props.location.pathname, {
            path: route.path,
            exact: route.exact || false,
            strict: route.strict || false
        });

        if (match) {
            activeRoute = route.key;
        }
    });

    return (
        <StyledMenu
            mode="horizontal"
            selectedKeys={[activeRoute]}
        >
            <Menu.Item key="print">
                <Link to='/print'>Print Issues</Link>
            </Menu.Item>
        </StyledMenu>
    );
};

export default withRouter(NavBar);
