import fetch from 'cross-fetch';
import { API_CONST } from '../API';
import { tokenUtil } from '../utils/token';

function loadRegionList(){
    console.log("API load user");
    let getObject = {
       method: 'GET',
       headers:{
          'Content-Type': 'application/json',
       }
    };
    // tokenUtil.updateOrCreateHeader(getObject);
 
    return fetch(API_CONST.API_URL + '/regions/all', getObject)
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

function fetchRegionDetail(uid){
    let getObject = {
        method: 'GET',
        headers:{
           'Content-Type': 'application/json',
        }
     }
  
     return fetch(API_CONST.API_URL + '/regions/findByUid/' + uid, getObject)
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

export const regionService = {
    loadRegionList,
    fetchRegionDetail
}