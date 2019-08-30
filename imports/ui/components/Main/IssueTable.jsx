import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Highlighter from 'react-highlight-words';

import { JiraClient } from '../../../api/jira/jiraClient';
import { jiraIssueMapper } from '../../lib/jiraMapper';
import NavButton from '../lib/NavButton';

const buildFilter = (issues, field) => {
    const list = [...new Set(issues.map(issue => issue[field]))];

    return list.map(item => ({
        text: item,
        value: item
    }));
};

const getSearchFilter = (dataIndex, title, Wrapper = ({ children }) => (<Fragment children={children} />)) => {

    const [searchText, setSearchText] = useState('');
    let searchInput;

    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${title}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text => (
            <Wrapper text={text}>
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            </Wrapper>
        )
    }
};

export const IssueTable = (props) => {
    const { boardId, sprintId, onChange, jiraUrl } = props;
    const [issues, setIssues] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (sprintId) {
            setLoading(true);

            JiraClient.getIssues(boardId, sprintId)
                .then(({ data }) => {
                    const mappedData = data.issues.map(jiraIssueMapper);
                    setIssues(mappedData);
                    setLoading(false);
                })
                .catch((err) => {
                    setIssues([]);
                    setLoading(false);
                    message.error('Loading Issues failed');
                });
        } else {
            setIssues([]);
        }

    }, [sprintId]);

    const statusFilter = buildFilter(issues, 'status');
    const issuetypeFilter = buildFilter(issues, 'issuetype');

    const columns = [
        {
            title: 'Issue',
            dataIndex: 'issuekey',
            key: 'issuekey',
            className: 'min-td',
            sorter: (a, b) => {
                const aMatch = /[0-9]+/.exec(a.issuekey);
                const bMatch = /[0-9]+/.exec(b.issuekey);

                return aMatch[0] - bMatch[0];
            },
            ...getSearchFilter('issuekey', 'Issue', ({ text, children }) => (
                <a href={`${jiraUrl}/browse/${text}`} target="_blank">{children}</a>
            ))
        },
        {
            title: 'Type',
            dataIndex: 'issuetype',
            key: 'issuetype',
            filters: issuetypeFilter,
            onFilter: (value, record) => record.issuetype === value,
        },
        {
            title: 'Summary',
            dataIndex: 'summary',
            key: 'summary',
            ...getSearchFilter('summary', 'Summary')
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: statusFilter,
            onFilter: (value, record) => record.status === value,
        },
    ];

    const rowSelection = {
        onChange
    };

    const isDisabled = () => boardId === 0;

    return (
        <Table
            title={() => (
                <Fragment>
                    <NavButton to={`/edit/story-template/${boardId}`} disabled={isDisabled()} icon="edit">Edit Story Template</NavButton>
                    {' '}
                    <NavButton to={`/edit/task-template/${boardId}`} disabled={isDisabled()} icon="edit">Edit Task Template</NavButton>
                </Fragment>
            )}
            loading={isLoading}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={issues}
            pagination={false}
        />
    );
};

IssueTable.defaultProps = {
    boardId: 0,
    sprintId: 0,
    jiraUrl: ''
};

IssueTable.propTypes = {
    boardId: PropTypes.number,
    sprintId: PropTypes.number,
    onChange: PropTypes.func,
    jiraUrl: PropTypes.string
};
