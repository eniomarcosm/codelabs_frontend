/* eslint-disable camelcase */
import http from './httpService';
import url from '../config.json';
import jwtDecode from 'jwt-decode';

const apiEndpoint = `${url.apiUrl}/api/auth`;
const tokenKey = 'token';

// eslint-disable-next-line no-use-before-define
http.setJwt(getJwt());

export async function login(email, senha) {
    const body={
        email: email,
        senha: senha
    }
    const { data: jwt } = await http.post(apiEndpoint,body);
    localStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
};
