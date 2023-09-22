import http from './httpService';
import url from '../config.json';

const apiEndpoint = `${url.apiUrl}/api/usuario`;
// const apiUserFuncionario = `${url.apiUrl}/api/userrole`;

export function getUsuarios() {
    return http.get(apiEndpoint);
}

export function saveUsuario(usuario) {
    return http.post(apiEndpoint, usuario);
}

export default {
    getUsuarios,
    saveUsuario
};
