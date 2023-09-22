import { LocalShipping } from '@mui/icons-material';

const icons = { LocalShipping };

const contentor = {
    id: 'usuarios',
    title: 'Gestão de Cargas',
    type: 'group',
    allowRole: [1, 2],
    children: [
        {
            id: 'cargas',
            title: 'Cargas',
            type: 'collapse',
            icon: icons.LocalShipping,
            dennyRole: [6, 8],
            children: [
                {
                    id: 'cad-cad',
                    title: 'Cadastrar',
                    type: 'item',
                    url: '/cargas/cadastrar',
                    breadcrumbs: false
                },
                {
                    id: 'ver-list',
                    title: 'Lista Nominal',
                    type: 'item',
                    url: '/cargas/listar',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'danos',
            title: 'Danos',
            type: 'collapse',
            icon: icons.LocalShipping,
            dennyRole: [6, 8],
            children: [
                {
                    id: 'danos-cad',
                    title: 'Registar',
                    type: 'item',
                    url: '/cargas/danos/cadastrar',
                    breadcrumbs: false
                },
                {
                    id: 'history-list',
                    title: 'Histórico',
                    type: 'item',
                    url: '/cargas/danos/historico',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default contentor;
