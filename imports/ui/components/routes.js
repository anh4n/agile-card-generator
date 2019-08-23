import { MainPage } from '../pages/MainPage';
import { NotFound } from '../pages/NotFound';

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
        key: 'notfound',
        component: NotFound
    }
];
