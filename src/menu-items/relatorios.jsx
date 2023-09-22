import { IconSchool, IconUser } from '@tabler/icons';
import { Payment, Timeline, History } from '@mui/icons-material';

const icons = { IconSchool, IconUser, Payment, Timeline, History };

const relatorios = {
    id: 'report',
    title: 'Gestão de Relatórios',
    type: 'group',
    allowRole: [1, 2, 4, 7, 8],
    children: [
        {
            id: 'report-pagamentos',
            title: 'Pagamentos',
            type: 'item',
            url: '/relatorio/pagamentos',
            icon: icons.Payment,
            dennyRole: [4, 5, 7],
            breadcrumbs: true
        },
        {
            id: 'report-servico',
            title: 'Distribuição de Serviço',
            type: 'item',
            url: '/relatorio/servico/distribuicao',
            icon: icons.Timeline,
            dennyRole: [4, 5],
            breadcrumbs: false
        },

        {
            id: 'report-modificacoes',
            title: 'Modificações',
            type: 'item',
            url: '/relatorio/modificacoes',
            icon: icons.History,
            dennyRole: [4, 5, 7],
            breadcrumbs: false
        },
        {
            id: 'report-pauta',
            title: 'Pautas',
            type: 'item',
            url: '/relatorio/docente/pauta',
            icon: icons.IconUser,
            dennyRole: [2, 3, 5],
            breadcrumbs: false
        },
        {
            id: 'report-presenca',
            title: 'Presenças',
            type: 'item',
            url: '/relatorio/presenca/estudante',
            icon: icons.IconUser,
            dennyRole: [2, 3, 5, 4],
            breadcrumbs: false
        }
    ]
};

export default relatorios;
