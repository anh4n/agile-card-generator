import React, { Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';

import { Column } from '../lib/Grid/Column';
import { ModalDataGrid } from '../lib/Grid/ModalDataGrid';

export const TeamEditModal = (props) => {

    const { data } = props;

    const onDelete = ((key, data) => {
        return Meteor.callPromise('team.delete', key);
    });

    const onSave = (data) => {
        return Meteor.callPromise('teams.upsert', data);
    };

    const onRecordCreate = (record) => {
        const storyTemplate = require('../../../../docs/templates/default-story-template.json');
        const styles = require('../../../../docs/templates/default-styles.json');

        const storyTemplateAsString = JSON.stringify(storyTemplate);
        const stylesAsString = JSON.stringify(styles);

        return {
            name: '',
            boardId: 0,
            projectName: '',
            storyTemplate: storyTemplateAsString,
            taskTemplate: storyTemplateAsString,
            styles: stylesAsString,
            ...record
        }
    };

    return (
        <Fragment>
            <ModalDataGrid
                title={'Teams'}
                OpenButton={<Button icon="edit">Edit Teams</Button>}
                width={'90vw'}
                idProperty={'_id'}
                dataSource={data}
                onRecordCreate={onRecordCreate}
                onSave={onSave}
                onDelete={onDelete}
            >
                <Column title={'Name'} dataIndex={'name'} />
                <Column title={'Board ID'} dataIndex={'boardId'} inputType={'number'} />
                <Column title={'Project Name'} dataIndex={'projectName'} inputType={'text'} />
            </ModalDataGrid>
        </Fragment>
    );
};

TeamEditModal.defaultProps = {
    data: []
};

TeamEditModal.propTypes = {
    data: PropTypes.array
};
