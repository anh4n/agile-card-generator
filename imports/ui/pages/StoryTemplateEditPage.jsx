import React from 'react';
import PropTypes from 'prop-types';

import { EditComponent } from '../components/lib/EditComponent';
import StoryEditForm from '../components/StoryTemplateEdit/StoryEditForm';

/**
 * @return {React.Component}
 */
export const StoryTemplateEditPage = (props) => {
    const { match } = props;
    const { boardId = "0" } = match.params;

    return (
        <EditComponent title={'Story Template'} showSaveButton>
            <StoryEditForm boardId={parseInt(boardId)} />
        </EditComponent>
    );
};

StoryTemplateEditPage.defaultProps = {};

StoryTemplateEditPage.propTypes = {};
