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

const loadPostList = userUid => {
   var getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   };
   let url = API_CONST.POST_LIST_URL(userUid);
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
         return data.data;
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
      }
   };
   tokenUtil.updateOrCreateHeader(getObject);

   return fetch(API_CONST.USER_LIST_URL, getObject)
      .then(responseData => {
         tokenUtil.checkAuthorizedStatus(responseData);
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
      }
   }
   tokenUtil.updateOrCreateHeader(getObject);
   return fetch(API_CONST.USER_DETAIL_URL(uid), getObject)
      .then(responseData => {
         tokenUtil.checkAuthorizedStatus(responseData);
         if(responseData.status >= 400){
            throw new Error('Bad response from server');
         }
         return responseData.json();
      })
      .then(data => {
         if(data.errorCode === 0){
            return data.data;
         }
      })
      .catch(err => {
         throw new Error(err);
      });
}

function deleteUser(uid){
   let getObject = {
      method: 'GET',
      headers:{
         'Content-Type': 'application/json',
      }
   }
   tokenUtil.updateOrCreateHeader(getObject);
   return fetch(API_CONST.DELETE_USER_URL(uid), getObject)
      .then(responseData => {
         tokenUtil.checkAuthorizedStatus(responseData);
         if(responseData.status >= 400){
            throw new Error('Bad response from server');
         }
         return responseData.json();
      })
      .then(data => {
         if(data.errorCode === 0){
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
   loadPostList,
   deleteUser
}
