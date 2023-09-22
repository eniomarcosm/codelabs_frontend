/* eslint-disable react/function-component-definition */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import 'react-toastify/dist/ReactToastify.css';

// ** Auth Service
import { getCurrentUser } from 'services/authService';
import UserContext from 'context/userContext';
import UserDataContext from 'context/userDataContext';
import { getUserEstudante, getUserFuncionario } from 'services/usuarioService';

// ==============================|| APP ||============================== //
function App() {
    const customization = useSelector((state) => state.customization);

    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserData, setCurrentUserData] = useState(null);

    useEffect(() => {
        const user = getCurrentUser();
        setCurrentUser(user);
    }, []);

    const getData = async () => {
        setCurrentUserData(currentUser);
    //     try {
    //         const { data } = await (currentUser?.role_id === 5 ? getUserEstudante(currentUser?.id) : getUserFuncionario(currentUser?.id));
    //         setCurrentUserData(data[0]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    };

    useEffect(() => {
        getData();
    }, [currentUser]);

    return (
        <UserContext.Provider value={currentUser}>
            <UserDataContext.Provider value={currentUserData}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={themes(customization)}>
                        <CssBaseline />
                        <NavigationScroll>
                            <ToastContainer />
                            <Routes />
                        </NavigationScroll>
                    </ThemeProvider>
                </StyledEngineProvider>
            </UserDataContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
