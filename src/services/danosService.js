import http from './httpService';
import url from '../config.json';
import UserContext from 'context/userContext';
import { useContext } from 'react';

const apiEndpoint = `${url.apiUrl}/api/danos`;

function formatDate(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

export function setDanos(dados) {
    // const body ={
    //     idContentor: dados.idContentor?.id,
    //     descricao: dados.descricao,
    //     idTipoDano: dados.idTipoDano,
    //     idRegistrador: dados.idRegistrador,
    // }
    // return http.post(`${apiEndpoint}`, dados);
}

export function getDanos() {
    return http.get(apiEndpoint);
}

export default {
    setDanos,
    getDanos
};
