import React from 'react';
import PropTypes from 'prop-types';
import InputNumber from 'antd/lib/input-number';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import {EditableContext} from './DataGrid';
import Switch from 'antd/lib/switch';

/**
 * @return {React.Component}
 *
 * @constructor
 */
export const Column = (props) => {
    const renderCell = ({getFieldDecorator}) => {

        const {
            editable,
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = props;

        const getInput = () => {
            if (inputType === 'switch') {
                return <Switch/>;
            }

            if (inputType === 'number') {
                return <InputNumber/>;
            }

            return <Input/>;
        };

        if (editable && editing) {

            const options = {
                initialValue: record[dataIndex],
                valuePropName: inputType === 'switch' ? 'checked' : 'value',
            };

            return (
                <td {...restProps}>
                    <Form.Item style={{margin: 0}}>
                        {getFieldDecorator(dataIndex, options)(getInput())}
                    </Form.Item>
                </td>
            );
        }

        const getDisplay = () => {
            if (inputType === 'switch') {
                return <Switch disabled={true} checked={props.record[dataIndex]}/>
            }

            return children;
        };

        return (
            <td {...restProps}>
                {getDisplay()}
            </td>
        );
    };

    return (
        <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>
    );
};

Column.defaultProps = {
    editable: true,
    inputType: 'text'
};

Column.propTypes = {
    title: PropTypes.string,
    dataIndex: PropTypes.string,
    editable: PropTypes.bool,
    inputType: PropTypes.oneOf(['text', 'number', 'checkbox', 'selectbox', 'textarea', 'switch']),
};
