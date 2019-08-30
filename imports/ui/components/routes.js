import { MainPage } from '../pages/MainPage';
import { NotFound } from '../pages/NotFound';
import { TeamEditPage } from '../pages/TeamEditPage';
import { StoryTemplateEditPage } from '../pages/StoryTemplateEditPage';
import { TaskTemplateEditPage } from '../pages/TaskTemplateEditPage';

export const routes = [
    {
        key: 'home',
        exact: true,
        path: '/',
        component: MainPage
    },
    {
        key: 'print',
        path: '/print/:boardId?/:sprintId?',
        component: MainPage
    },
    {
        key: 'teamEdit',
        path: '/edit/teams',
        component: TeamEditPage
    },
    {
        key: 'storyTemplateEdit',
        path: '/edit/story-template/:boardId',
        component: StoryTemplateEditPage
    },
    {
        key: 'taskTemplateEdit',
        path: '/edit/task-template/:boardId',
        component: TaskTemplateEditPage
    },
    {
        key: 'notfound',
        component: NotFound
    }
];
