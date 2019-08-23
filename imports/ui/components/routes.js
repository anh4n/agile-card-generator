import { MainPage } from '../pages/MainPage';
import { NotFound } from '../pages/NotFound';
import { TeamEditPage } from '../pages/TeamEditPage';

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
        key: 'notfound',
        component: NotFound
    }
];
