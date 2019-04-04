import fetch from 'cross-fetch';
import { API_CONST } from '../API';

const login = user => {
    var postObject = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };
    let url = API_CONST.LOGIN_URL

    return fetch(url, postObject)
        .then(responseData => {
            if (responseData.status >= 400) {
                throw new Error(responseData.statusText);
            }
            return responseData.json();
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new Error(err);
        });
}

const loginAdmin = user => {
    var postObject = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };
    let url = API_CONST.LOGIN_ADMIN_URL

    return fetch(url, postObject)
        .then(responseData => {
            if (responseData.status >= 400) {
                throw new Error(responseData.statusText);
            }
            return responseData.json();
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new Error(err);
        });
}
export const loginService = {
    login,
    loginAdmin
}