// assets
// import { IconHome } from '@tabler/icons';
import { Home } from '@mui/icons-material';

// constant
const icons = { Home };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Painel',
    type: 'group',
    allowRole: [1, 2, 3, 4, 5, 7, 8],
    children: [
        {
            id: 'default',
            title: 'Início',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.Home,
            dennyRole: [],
            breadcrumbs: false
        }
    ]
};

export default dashboard;
