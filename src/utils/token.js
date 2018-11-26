import { constant } from "./Constant";

const updateOrCreateHeader = header => {
    if (header === null || header === undefined) {
        header = {
            method: 'GET',
            headers: {
            }
        }
    }
    let token = window.localStorage.getItem(constant.TOKEN_VARIABLE_NAME);
    if (token === null) {
        //      window.location= '#login';
    }
    if (header.headers === null || header.headers === undefined) {
        header.headers = {};
    }
    header.headers[constant.TOKEN_HEADER_KEY] = token;
    console.log(header);
    return header;
}

const checkAuthorizedStatus = responseData => {
    if (responseData && responseData.status === 401) {
        window.location = '#login';
    }
}

export const tokenUtil = {
    updateOrCreateHeader,
    checkAuthorizedStatus
};