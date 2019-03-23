import fetch from 'cross-fetch';
import { API_CONST } from '../API';
import { tokenUtil } from '../utils/token';

const getRegionList = () => {
   const getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   };
   let url = API_CONST.REGION_LIST_URL;
   // tokenUtil.updateOrCreateHeader(getObject);
   return fetch(url, getObject)
      .then(responseData => {
         tokenUtil.checkAuthorizedStatus(responseData);
         if (responseData.status >= 400) {
            throw new Error('Bad response from server');
         }
         return responseData.json();
      })
      .then(data => {
         tokenUtil.checkResponseErrorCode(data);
         return data;
      })
      .catch(err => {
         throw new Error(err);
      });
}
const loadRegionList = () => {
   let getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
   };
   tokenUtil.updateOrCreateHeader(getObject);

   return fetch(API_CONST.REGION_LIST_URL, getObject)
      .then(responseData => {
         tokenUtil.checkAuthorizedStatus(responseData);
         if (responseData.status >= 400) {
            throw new Error("Bad response from server");
         }
         return responseData.json();
      })
      .then(data => {
         tokenUtil.checkResponseErrorCode(data);
         return data;
      })
      .catch(err => {
         throw new Error(err);
      });
}

const fetchRegionDetail = uid => {
   let getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
   }

   return fetch(API_CONST.REGION_DETAIL_URL(uid), getObject)
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

const fetchRegionById = id => {
   let getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
   }

   return fetch(API_CONST.REGION_DETAIL_ID_URL(id), getObject)
      .then(responseData => {
         if (responseData.status >= 400) {
            throw new Error('Bad response from server');
         }
         return responseData.json();
      })
      .then(data => {
         if (data.errorCode === 0) {
            return data;
         }
      })
      .catch(err => {
         throw new Error(err);
      })
      .catch(err => {
         return err;
      });
};

const loadRegionsWithUserLoggedIn = userUid => {
   const getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   };
   let url = API_CONST.USER_REGION_LIST_URL(userUid);
   tokenUtil.updateOrCreateHeader(getObject);
   return fetch(url, getObject)
      .then(responseData => {
         tokenUtil.checkAuthorizedStatus(responseData);
         if (responseData.status >= 400) {
            throw new Error('Bad response from server');
         }
         return responseData.json();
      })
      .then(data => {
         tokenUtil.checkResponseErrorCode(data);
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
   let url = API_CONST.REGION_ADD_POST_URL;
   tokenUtil.updateOrCreateHeader(getObject);
   return fetch(url, getObject)
      .then(responseData => {
         tokenUtil.checkAuthorizedStatus(responseData);
         if (responseData.status >= 400) {
            throw new Error('Bad response from server');
         }
         return responseData.json();
      })
      .then(data => {
         tokenUtil.checkResponseErrorCode(data);
         return data;
      })
      .catch(err => {
         throw new Error(err);
      });
}

export const regionService = {
   loadRegionList,
   fetchRegionDetail,
   getRegionList,
   fetchRegionById,
   loadRegionsWithUserLoggedIn,
   addPost
}