const decodeToken = (token) => {
   var jwtInfo = JSON.parse(atob(token.split('.')[1]));
   return jwtInfo;
};

export const decodeJWT = {
   decodeToken
}