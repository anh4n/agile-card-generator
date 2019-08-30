import React from 'react';
import PropTypes from 'prop-types';

import { EditComponent } from '../components/lib/EditComponent';
import TaskEditForm from '../components/TaskTemplateEdit/TaskEditForm';

/**
 * @return {React.Component}
 */
export const TaskTemplateEditPage = (props) => {
    const { match } = props;
    const { boardId = "0" } = match.params;

    return (
        <EditComponent title={'Task Template'} showSaveButton>
            <TaskEditForm boardId={parseInt(boardId)} />
        </EditComponent>
    );
};

TaskTemplateEditPage.defaultProps = {};

TaskTemplateEditPage.propTypes = {};
