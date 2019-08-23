import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { message } from 'antd';
import List from 'antd/lib/list';
import Tag from 'antd/lib/tag';
import classnames from 'classnames';

import { JiraClient } from '../../../api/jira/jiraClient';

const StyledListItem = styled(List.Item)`
    cursor: pointer;
`;

export const SprintList = (props) => {
    const { boardId, value, history } = props;
    const [sprints, setSprints] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (boardId) {
            setLoading(true);

            JiraClient.getSprints(boardId)
                .then(({ data }) => {
                    if (!data) {
                        setSprints([]);
                    }

                    const mappedData = data.values.map(sprint => ({
                        name: sprint.name,
                        value: sprint.id,
                        state: sprint.state
                    }));

                    setSprints(mappedData);
                    setLoading(false);

                    if (mappedData.length > 0) { // show active sprint as default
                        const activeSprint = mappedData.filter(sprint => sprint.state === 'active');

                        if (activeSprint.length > 0) {
                            history.push(`/print/${boardId}/${activeSprint[0].value}`);
                        }
                    }
                })
                .catch((err) => {
                    setSprints([]);
                    setLoading(false);
                    message.error('Loading Sprints failed');
                });
        } else {
            setSprints([]);
        }

    }, [boardId]);

    const onClick = (value, sprintName) => {
        history.push(`/print/${boardId}/${value}`);
    };

    const renderSprintStatus = ({ state }) => {
        if (!state) {
            return null;
        }

        const color = 'active' === state ? 'green' : 'blue';

        return (
            <Tag color={color}>{state}</Tag>
        )
    };

    const renderSprint = (sprint) => {
        const className = classnames({
            'bg-info': sprint.value === value
        });

        return (
            <StyledListItem
                className={className}
                key={sprint.value}
                onClick={onClick.bind(null, sprint.value, sprint.name)}
            >
                <List.Item.Meta title={sprint.name} />
                {renderSprintStatus(sprint)}
            </StyledListItem>
        )
    };

    return (
        <List loading={isLoading} bordered dataSource={sprints} renderItem={renderSprint} size="small" />
    );
};

SprintList.defaultProps = {
    value: 0,
    team: 0
};

SprintList.propTypes = {
    value: PropTypes.number,
    boardId: PropTypes.number
};

export default withRouter(SprintList);
