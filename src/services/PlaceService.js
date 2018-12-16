import fetch from 'cross-fetch';
import { API_CONST } from '../API';
import { tokenUtil } from '../utils/token';

function loadPlaceList() {
   console.log("API load user");
   let getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
   };
   // tokenUtil.updateOrCreateHeader(getObject);

   return fetch(API_CONST.PLACE_LIST_URL, getObject)
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

function fetchPlaceDetail(uid) {
   let getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
   }

   return fetch(API_CONST.PLACE_DETAIL_URL(uid), getObject)
      .then(responseData => {
         if (responseData.status >= 400) {
            throw new Error('Bad response from server');
         }
         return responseData.json();
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

function findPlaceByRegion(regionUid) {
   let getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
   }

   return fetch(API_CONST.PLACE_FIND_BY_REGION_URL(regionUid), getObject)
      .then(responseData => {
         if (responseData.status >= 400) {
            throw new Error('Bad response from server');
         }
         return responseData.json();
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

function updatePlace(place) {
   let putObject = {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(place)
   };

   tokenUtil.updateOrCreateHeader(putObject);

   return fetch(API_CONST.PLACE_UPDATE_URL, putObject)
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
         throw new Error(err);
      });
}

const addNewPlace = place => {
   let postObject = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(place)
   };

   tokenUtil.updateOrCreateHeader(postObject);

   return fetch(API_CONST.ADD_PLACE_URL, postObject)
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
         throw new Error(err);
      });
}

const addPost = newPost => {
   const getObject = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
   };
   let url = API_CONST.PLACE_ADD_POST_URL;
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
         if (data.errorCode === 0) {
            return data;
         }
      })
      .catch(err => {
         return err;
      });
}


export const placeService = {
   loadPlaceList,
   fetchPlaceDetail,
   findPlaceByRegion,
   updatePlace,
   addNewPlace,
   addPost
}