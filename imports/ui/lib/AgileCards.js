import { notification } from 'antd';
import { TeamsCollection } from '../../api/teams/teamsCollection';

export const AgileCards = {
    getTemplates: (boardId) => {
        const { storyTemplate, taskTemplate } = TeamsCollection.findOne({ boardId });

        if (!storyTemplate) {
            notification.error({
                message: 'Error',
                description: 'Story template not found'

            });
            throw new Error('Story template not found');
        }

        if (!taskTemplate) {
            notification.error({
                message: 'Error',
                description: 'Task template not found'

            });
            throw new Error('Task template not found');
        }

        return {
            storyTemplate,
            taskTemplate
        };
    },

    getStyle: (boardId) => {
        const { styles } = TeamsCollection.findOne({ boardId });

        if (!styles) {
            notification.error({
                message: 'Error',
                description: 'Styles not found'

            });
            throw new Error('Styles not found');
        }

        return JSON.parse(styles);
    },
};
