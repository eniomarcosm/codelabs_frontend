import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';
import { useContext } from 'react';
import UserContext from 'context/userContext';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const user = useContext(UserContext);
    if (user) {
        return useRoutes([MainRoutes]);
    }
    return useRoutes([AuthenticationRoutes]);
}
