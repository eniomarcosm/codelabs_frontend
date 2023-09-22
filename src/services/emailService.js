import http from './httpService';
import url from '../config.json';

const apiEndpoint = `${url.apiUrl}/api/sendmail`;

export function sendConfirmSignupEmail(dados) {
    const body = {
        email: dados.email,
        nome: dados.nome,
        apelido: dados.apelido
    };

    return http.post(apiEndpoint, body);
}

export default {
    sendConfirmSignupEmail
};
