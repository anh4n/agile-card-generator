import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import { message } from 'antd';

import BackPageHeader from './BackPageHeader';
import { StyledCard } from './StyledComponents';
import { showFormErrorNotification } from './Form/notifications';

export const EditComponent = (props) => {
    const { title, showSaveButton, children } = props;
    const childRef = useRef();

    const Child = forwardRef((props, ref) => (
        React.cloneElement(children, {
            forwardedRef: ref,
            ...props
        })
    ));

    const onSaveClick = () => {
        childRef.current.save()
            .then(() => {
                message.info('Data saved');
            })
            .catch(err => {
                console.error(err);
                showFormErrorNotification(err);
            });
    };

    const extra = [];
    if (showSaveButton) {
        extra.push(
            <Button key={1} icon={'save'} type="primary" onClick={onSaveClick}>Save</Button>
        );
    }

    return (
        <StyledCard
            title={
                <BackPageHeader title={title} />
            }
            extra={extra}
        >
            <Child ref={childRef} />
        </StyledCard>
    );
};

EditComponent.defaultProps = {
    title: '',
    showSaveButton: false,
};

EditComponent.propTypes = {
    title: PropTypes.string,
    showSaveButton: PropTypes.bool,
};
