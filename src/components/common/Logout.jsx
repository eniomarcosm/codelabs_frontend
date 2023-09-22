import { useEffect } from 'react';
import { logout } from 'services/authService';

export default function Logout() {
    useEffect(() => {
        logout();
        window.location = '/login';
    }, []);

    return null;
}
