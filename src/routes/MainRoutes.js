/* eslint-disable prettier/prettier */
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { element } from 'prop-types';

// ** Matriculas e Inscricoes
const Incricoes = Loadable(lazy(() => import('views/registroAcademico/Incricoes')));
const CadastrarContentor = Loadable(lazy(() => import('views/contentor/CadastrarContentor')));
const HistoricoDanos = Loadable(lazy(() => import('views/danos/HistoricoDanos')));

const CargasListar = Loadable(lazy(() => import('views/contentor/ListarContentor')));

const RegistarDanos = Loadable(lazy(() => import('views/danos/RegistarDanos')));

const Usuarios = Loadable(lazy(() => import('views/usuario/Usuarios')));

const Logout = Loadable(lazy(() => import('components/common/Logout')));

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/cargas/cadastrar',
            element: <CadastrarContentor />
        },
        {
            path: '/cargas/listar',
            element: <CargasListar />
        },
        {
            path: '/cargas/danos/historico',
            element: <HistoricoDanos />
        },
        {
            path: '/cargas/cadastrar',
            element: <CadastrarContentor />
        },
        {
            path: '/cargas/danos/cadastrar',
            element: <RegistarDanos />
        },
        {
            path: '/usuarios',
            element: <Usuarios />
        },
        {
            path: '/logout',
            element: <Logout />
        }
    ]
};

export default MainRoutes;
