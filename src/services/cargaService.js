import http from './httpService';
import url from '../config.json';

const apiEndpoint = `${url.apiUrl}/api/contentor`;

function formatDate(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

export function setContentor(dados) {
    const body = {
        label: dados.label,
        origem: dados.origem,
        data_chegada: formatDate(dados.data_chegada),
        transportador: dados.transportador,
        qrcoderef: dados.qrcoderef
    };
    return http.post(`${apiEndpoint}`, body);
}

export function getContentores() {
    return http.get(apiEndpoint);
}

export default {
    setContentor,
    getContentores
};
