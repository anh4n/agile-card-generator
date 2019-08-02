import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from 'antd/lib/table';
import Form from 'antd/lib/form';
import Popconfirm from 'antd/lib/popconfirm';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import { Column } from './Column';
import Button from 'antd/lib/button';
import { message } from 'antd';
import nanoid from 'nanoid';

export const EditableContext = React.createContext();

const ClickableIcon = styled(Icon)`
    cursor: pointer;
    font-size: 20px;
    margin: 0 10px;
`;

/**
 * @return {React.Component}
 *
 * @constructor
 */
const DataGrid = (props) => {
    const { idProperty, dataSource, onSave, onDelete, onRecordCreate, form, children, ...restProps } = props;
    const [editingKey, setEditingKey] = useState('');
    const [data, setData] = useState(dataSource);

    useEffect(() => {
        setData(dataSource);
    }, [dataSource]);

    const isEditing = record => record[idProperty] === editingKey;

    const onCancelClick = () => {
        setEditingKey('');
    };

    const onEditClick = (key) => {
        setEditingKey(key);
    };

    const onSaveClick = (form, key) => {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...data];
            const index = newData.findIndex(item => key === item[idProperty]);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                saveData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                saveData(newData);
                setEditingKey('');
            }
        });
    };

    const onAddRowClick = () => {
        const record = onRecordCreate({ [idProperty]: nanoid(10) });
        const newData = [...data, record];
        saveData(newData);
    };

    const onDeleteRowClick = (id) => {
        const index = data.findIndex(item => id === item[idProperty]);
        const newData = [...data.slice(0, index), ...data.slice(index + 1)];
        deleteData(id, newData);
        setEditingKey('');
    };

    const saveData = (newData) => {
        onSave(newData)
            .then(() => {
                setData(newData);
                message.info('Record saved');
            })
            .catch(err => {
                message.error(err.toString());
            });
    };

    const deleteData = (id, newData) => {
        onDelete(id, newData)
            .then(() => {
                setData(newData);
                message.info('Record deleted');
            })
            .catch((err) => {
                message.error(err.toString());
            });
    };

    const actionRenderer = (text, record) => {
        const id = record[idProperty];

        if (isEditing(record)) {
            return (
                <span>
                    <EditableContext.Consumer>
                        {form => (
                            <Tooltip title="Save">
                                <ClickableIcon type="save" onClick={() => onSaveClick(form, id)} />
                            </Tooltip>
                        )}
                    </EditableContext.Consumer>
                    <Popconfirm title="Cancel edit?" onConfirm={() => onCancelClick(id)}>
                        <ClickableIcon type="stop" />
                    </Popconfirm>
                </span>
            );
        }

        return (
            <Fragment>
                <Tooltip title="Edit record">
                    <ClickableIcon hidden={editingKey !== ''} type="edit" onClick={() => onEditClick(id)} />
                </Tooltip>
                <Popconfirm title="Delete record?" onConfirm={() => onDeleteRowClick(id)}>
                    <ClickableIcon hidden={editingKey !== ''} type="delete" />
                </Popconfirm>
            </Fragment>
        );
    };

    const columns = React.Children.map(children, child => {
        return {
            title: child.props.title,
            dataIndex: child.props.dataIndex,
            onCell: record => ({
                record,
                editing: isEditing(record),
                ...child.props
            }),
        };
    });

    columns.push({
        dataIndex: 'operation',
        className: 'min-td',
        render: actionRenderer
    });

    const components = {
        body: {
            cell: Column,
        },
    };

    return (
        <Fragment>
            <EditableContext.Provider value={form}>
                <Table
                    rowKey={idProperty}
                    title={() => (
                        <Tooltip title="Add new record">
                            <Button onClick={onAddRowClick} type="primary" shape="circle" icon="plus" />
                        </Tooltip>
                    )}
                    {...restProps}
                    components={components}
                    dataSource={data}
                    columns={columns}
                />
            </EditableContext.Provider>
        </Fragment>
    );
};

export default Form.create()(DataGrid);

DataGrid.defaultProps = {
    idProperty: 'id',
    onRecordCreate: (record) => (record),
    onSave: Promise.resolve(),
    onDelete: Promise.resolve(),
};

DataGrid.propTypes = {
    idProperty: PropTypes.string,
    onRecordCreate: PropTypes.func,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    dataSource: PropTypes.array
};
