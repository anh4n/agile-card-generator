import React, { Fragment } from 'react';
import nanoid from 'nanoid';
import { notification } from 'antd';

export const showFormErrorNotification = (err) => {
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
