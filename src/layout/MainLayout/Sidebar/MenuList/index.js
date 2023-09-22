// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useContext } from 'react';
import UserContext from 'context/userContext';

// ==============================|| SIDEBAR MENU LIST ||============================== //

function MenuList() {
    const currentUser = useContext(UserContext);
    const navItems = menuItem.items.map((item) => {
        if (!item.allowRole?.includes(currentUser.tipo)) {
            return null;
        }
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{navItems}</>;
}

export default MenuList;
