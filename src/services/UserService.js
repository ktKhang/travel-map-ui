import React, { Component } from 'react';
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
   console.log(url)

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
         throw new Error(err);
      });
}
export const userService = {
   fetchUserDetail
}