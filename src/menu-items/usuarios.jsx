import { VerifiedUser, Work } from '@mui/icons-material';

const icons = { VerifiedUser, Work };

const usuarios = {
    id: 'usuarios',
    title: 'Gestão de Usuários',
    type: 'group',
    allowRole: [1],
    children: [
        {
            id: 'user',
            title: 'Usuários',
            type: 'item',
            icon: icons.VerifiedUser,
            url: '/usuarios',
            dennyRole: [6, 8]
        }
        // ,
        // {
        //     id: 'worker',
        //     title: 'Funcionarios',
        //     type: 'collapse',
        //     icon: icons.Work,
        //     dennyRole: [7, 8],
        //     children: [
        //         {
        //             id: 'worker-cad',
        //             title: 'Cadastrar',
        //             type: 'item',
        //             url: '/funcionario/cadastrar',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'worker-list',
        //             title: 'Lista Nominal',
        //             type: 'item',
        //             url: '/funcionario/listar',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default usuarios;
