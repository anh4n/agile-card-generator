import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import { notification, message } from 'antd';
import nanoid from 'nanoid';

const showFormErrorNotification = (err) => {
    const renderErrors = () => {
        return Object.keys(err).map(fieldName => {
            const fields = err[fieldName].errors.map(error => {
                return (
                    <div key={nanoid()}>
                        &nbsp;&nbsp;- <span className={'text-error'}>{error.message}</span>
                    </div>
                );
            });

            return [
                <div key={nanoid()} style={{ textTransform: 'capitalize' }}>{fieldName}</div>,
                ...fields
            ];
        });
    };

    notification.error({
        message: 'Form Validation failed',
        description: <Fragment>{renderErrors()}</Fragment>,
        duration: 10
    });
};

export const ModalForm = (props) => {
    const { title, width, OpenButton, onSave, children, ...restProps } = props;
    const [isVisible, setVisible] = useState(false);

    const toggleModal = () => {
        setVisible(!isVisible);
    };

    const getOpenButton = () => {

        if ('string' === typeof OpenButton) {
            return (
                <Button onClick={toggleModal}>
                    {OpenButton}
                </Button>
            );
        }

        return React.cloneElement(OpenButton, {
            onClick: toggleModal
        });
    };

    const saveData = (newData) => {
        onSave(newData)
            .then(() => {
                message.info('Data saved');
            })
            .catch(err => {
                console.error(err);
                showFormErrorNotification(err);
            });
    };

    return (
        <Fragment>
            {getOpenButton()}
            <Modal
                title={title}
                visible={isVisible}
                width={width}
                okText={'Save'}
                onOk={saveData}
                onCancel={toggleModal}
            >
                <Form {...restProps}>
                    {children}
                </Form>
            </Modal>
        </Fragment>
    );
};

ModalForm.defaultProps = {
    title: ''
};

ModalForm.propTypes = {
    title: PropTypes.string,
    idProperty: PropTypes.string,
    dataSource: PropTypes.array,
    onSave: PropTypes.func,
    OpenButton: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
