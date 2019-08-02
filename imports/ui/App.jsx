import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';

import {MainPage} from './pages/MainPage';
import 'antd/dist/antd.css';
import './styles.css';
import Row from 'antd/lib/grid/row';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top:15px;
`;

export const App = () => {
    return (
        <Wrapper>
            <Row>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/:boardId?/:sprintId?' component={MainPage}/>
                    </Switch>
                </BrowserRouter>
            </Row>
        </Wrapper>
    );
};

App.defaultProps = {};

App.propTypes = {};
