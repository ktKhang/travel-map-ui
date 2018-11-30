import fetch from 'cross-fetch';
import { API_CONST } from '../API';
import { tokenUtil } from '../utils/token';

function loadPlaceList(){
    console.log("API load user");
    let getObject = {
       method: 'GET',
       headers:{
          'Content-Type': 'application/json',
       }
    };
    // tokenUtil.updateOrCreateHeader(getObject);
 
    return fetch(API_CONST.API_URL + '/places/all', getObject)
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

function fetchPlaceDetail(uid){
   let getObject = {
      method: 'GET',
      headers:{
         'Content-Type': 'application/json',
      }
   }

   return fetch(API_CONST.API_URL + '/places/findByUid/' + uid, getObject)
      .then(responseData => {
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

function findPlaceByRegion(regionUid){
   let getObject = {
      method: 'GET',
      headers:{
         'Content-Type': 'application/json',
      }
   }

   return fetch(API_CONST.API_URL + '/places/findByRegionUid/' + regionUid, getObject)
      .then(responseData => {
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

function updatePlace(place){
   let putObject = {
      method: 'PUT',
      headers:{
         'Content-Type': 'application/json',
         'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1MGloN1lCa3ZwcmkiLCJpYXQiOjE1NDM1MDQwNjgsImV4cCI6MTU0NDEwODg2OCwicm9sZSI6IlVTRVIifQ.9y6zcONJB_tMDY8bSg3DIZxzuJwNLL22r4HOoIYrU1nnrYB9s7bNHl__jGB6wQEYUF_IC1bMn18OtvSY19zEEg',
      },
      body: JSON.stringify(place)
   };

   // tokenUtil.updateOrCreateHeader(putObject);
     
   return fetch(API_CONST.API_URL + '/places/update/', putObject)
   .then(responseData => {
      //  tokenUtil.checkAuthorizedStatus(responseData);
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

export const placeService = {
    loadPlaceList,
    fetchPlaceDetail,
    findPlaceByRegion,
    updatePlace
}