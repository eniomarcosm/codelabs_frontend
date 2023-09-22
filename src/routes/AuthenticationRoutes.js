import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { element } from 'prop-types';

// login option 3 routing

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const Logout = Loadable(lazy(() => import('components/common/Logout')));

// My Routes
const Estudante = Loadable(lazy(() => import('views/cadastro/Estudante')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin3 />
        },

        {
            path: '/logout',
            element: <Logout />
        },
        {
            path: '/cadastro',
            element: <AuthRegister3 />
        },

        // to see
        {
            path: '/cadastro/estudante',
            element: <Estudante />
        }
    ]
};

export default AuthenticationRoutes;
