import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import DataGrid from './DataGrid';

export const ModalDataGrid = (props) => {
    const {title, width, OpenButton, children, ...restProps} = props;
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

    return (
        <Fragment>
            {getOpenButton()}
            <Modal
                title={title}
                visible={isVisible}
                width={width}
                footer={null}
                onCancel={toggleModal}
            >
                <DataGrid {...restProps}>
                    {children}
                </DataGrid>
            </Modal>
        </Fragment>
    );
};

ModalDataGrid.defaultProps = {
    title: ''
};

ModalDataGrid.propTypes = {
    title: PropTypes.string,
    idProperty: PropTypes.string,
    dataSource: PropTypes.array,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    onRecordCreate: PropTypes.func,
    OpenButton: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
