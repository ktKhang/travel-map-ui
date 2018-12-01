import fetch from 'cross-fetch';
import { API_CONST } from '../API';
import { tokenUtil } from '../utils/token';

const getRegionList = () => {
   var getObject = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   };
   let url = API_CONST.REGION_LIST_URL;
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
export const regionService = {
   getRegionList
}