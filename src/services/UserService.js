import fetch from 'cross-fetch';
import { API_CONST } from '../API';
import { tokenUtil } from '../utils/token';

const fetchUserDetail = userUid => {
   var getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   };
   let url = API_CONST.USER_DETAIL_URL(userUid);
   tokenUtil.updateOrCreateHeader(getObject);
   return fetch(url, getObject)
      .then(responseData => {
         tokenUtil.checkAuthorizedStatus(responseData);
         if (responseData.status >= 400) {
            throw new Error(responseData.statusText);
         }
         return responseData.json();
      })
      .then(data => {
         return data;
      })
      .catch(err => {
         return err;
      });
}

function loadUserList(){
   console.log("API load user");
   let getObject = {
      method: 'GET',
      headers:{
         'Content-Type': 'application/json',
         'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1MGloN1lCa3ZwcmkiLCJpYXQiOjE1NDM1MDQwNjgsImV4cCI6MTU0NDEwODg2OCwicm9sZSI6IlVTRVIifQ.9y6zcONJB_tMDY8bSg3DIZxzuJwNLL22r4HOoIYrU1nnrYB9s7bNHl__jGB6wQEYUF_IC1bMn18OtvSY19zEEg',
      }
   };
   // tokenUtil.updateOrCreateHeader(getObject);

   return fetch(API_CONST.USER_LIST_URL, getObject)
      .then(responseData => {
         // tokenUtil.checkAuthorizedStatus(responseData);
         if (responseData.status >= 400) {
               throw new Error("Bad response from server");
         }
         return responseData.json(); // This is a MUST, do not remove.
      })
      .then(data => {
         if (data.errorCode === 0) {
               return data.data;
         }
      })
      .catch(err => {
         throw new Error(err);
      });
}

function fetchUserDetailTest(uid){
   let getObject = {
      method: 'GET',
      headers:{
         'Content-Type': 'application/json',
         'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1MGloN1lCa3ZwcmkiLCJpYXQiOjE1NDM1MDQwNjgsImV4cCI6MTU0NDEwODg2OCwicm9sZSI6IlVTRVIifQ.9y6zcONJB_tMDY8bSg3DIZxzuJwNLL22r4HOoIYrU1nnrYB9s7bNHl__jGB6wQEYUF_IC1bMn18OtvSY19zEEg',
      }
   }

   return fetch(API_CONST.USER_DETAIL_URL(uid), getObject)
      .then(responseData => {
         if(responseData.status >= 400){
            throw new Error('Bad response from server');
         }
         return responseData.json();
      })
      .then(data => {
         if(data.errorCode == 0){
            return data.data;
         }
      })
      .catch(err => {
         throw new Error(err);
      });
}

export const userService = {
   fetchUserDetail,
   loadUserList,
   fetchUserDetailTest,
}
