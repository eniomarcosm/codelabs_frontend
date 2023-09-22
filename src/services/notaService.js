import http from './httpService';
import url from '../config.json';

const apiEndpoint = `${url.apiUrl}/api/docente/criaravaliacao`;

function formatDate(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

export function criarAvaliacao(dados, idDocente) {
    const datarealizacao = formatDate(dados.datarealizacao);
    const body = {
        descricao: dados.descricao,
        tipo_avaliacao: dados.tipo_avaliacao,
        datarealizacao,
        disciplina: dados.disciplina,
        percentagem: dados.percentagem,
        docente: idDocente,
        disponivel: 1
    };

    console.log(body);

    return http.post(`${apiEndpoint}`, body);
}

export function getAvaliacoes(disciplina) {
    return http.get(`${apiEndpoint}`);
}

export default {
    criarAvaliacao,
    getAvaliacoes
};
