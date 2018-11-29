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
         'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaFM2WEdxVXUwV1QiLCJpYXQiOjE1NDMzMzI1MDYsImV4cCI6MTU0MzkzNzMwNiwicm9sZSI6IlVTRVIifQ.W_vu-22qa1P7md7tunJCDR801D4gutzuuPY_jI1lnoe_K5ZI1g95Sg0X2oy58WJAd7lRdKNn-EheDtt_kSkRdg',
      }
   };
   // tokenUtil.updateOrCreateHeader(getObject);

   return fetch(API_CONST.API_URL + '/users/all', getObject)
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
         'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaFM2WEdxVXUwV1QiLCJpYXQiOjE1NDMzMzI1MDYsImV4cCI6MTU0MzkzNzMwNiwicm9sZSI6IlVTRVIifQ.W_vu-22qa1P7md7tunJCDR801D4gutzuuPY_jI1lnoe_K5ZI1g95Sg0X2oy58WJAd7lRdKNn-EheDtt_kSkRdg',
      }
   }

   return fetch(API_CONST.API_URL + '/users/show/' + uid, getObject)
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
