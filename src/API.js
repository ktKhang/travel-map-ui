const API_URL = 'http://localhost:8080';

// Declare all urls here
const LOGIN_URL = API_URL + '/auth/login'
const USER_DETAIL_URL = uid => {
   return API_URL + '/users/show/' + uid
}

export const API_CONST = {
   API_URL
   , LOGIN_URL
   , USER_DETAIL_URL
};