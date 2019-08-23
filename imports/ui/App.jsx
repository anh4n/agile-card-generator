import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';
import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';

import 'antd/dist/antd.css';
import './styles.css';

import NavBar from './components/NavBar';
import { routes } from './components/routes'

const Logo = styled.div`
    font-size: 24px;
    display: inline-block;
    margin-right: 30px;
    line-height: 57px;
`;

const Version = styled.span`
    font-size: 12px;
    margin-left: 15px;
`;

const Header = styled(Layout.Header)`
    background-color: #e6f7ff !important;
`;

const Content = styled(Layout.Content)`
    margin: 15px;
`;

export const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Header>
                    <Logo>
                        <Icon type={'idcard'} /> Agile Card Generator
                        <Version>2.0.0</Version>
                    </Logo>
                    <NavBar />
                </Header>
                <Content>
                    <Switch>
                        {
                            routes.map(route => (
                                <Route {...route} />
                            ))
                        }
                    </Switch>
                </Content>
            </Layout>
        </BrowserRouter>
    );
};

App.defaultProps = {};

App.propTypes = {};
