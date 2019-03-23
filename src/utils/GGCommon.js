import _ from 'lodash';
import store from '../Store/Store';
import { constant } from './Constant';
import ReactDOM from 'react-dom';

/**
 * Deep clone list object
 * @param {*} listObj 
 */
const deepClone = (listObj) => {
   var output, value, key;
   output = Array.isArray(listObj) ? [] : {};
   for (key in listObj) {
      value = listObj[key];
      if (output[key] === (typeof value === "object")) {
         output[key] = deepClone(value);

      } else {
         output[key] = value;
      }
   }
   return output;
}

/**
 * Remove 1 element from array
 * @param {*} array 
 * @param {*} element 
 */
const removeObj = (array, element) => {
   return array.filter(e => !_.isEqual(e, element));
}

/**
 * Sort list object
 * @param {*} property 
 * @param {*} type 
 */
const sortListObj = (property, type) => {

   return (x, y) => {
      if (type === 'asc') {
         return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
      } else if (type === 'desc') {
         return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
      }
   };

};

/**
 * Check is an array contain element
 * @param {*} array 
 * @param {*} element 
 */
const checkIncludes = (array, element) => {
   let checked = array.find(e => _.isEqual(e, element));
   if (checked) {
      return true;
   } else {
      return false;
   }
}

/**
 * close common modal
 */
const closeModal = () => {
   ReactDOM.unmountComponentAtNode(document.getElementById('modalDiv'));
}

/**
 * store regionData to Store
 * @param {*} regionData 
 */
const setRegionData = (regionData) => {
   store.dispatch({
      type: constant.SET_REGION_DATA,
      regionData: regionData,
   })
}

/**
 * For Post actions
 */

const setAddPost = () => {
   store.dispatch({
      type: constant.ADD_POST,
      value: true,
   })
}

const cancelAddPost = () => {
   store.dispatch({
      type: constant.ADD_POST,
      value: false,
   })
}

/**
 * For Album actions
 */
const setAddAlbum = () => {
   store.dispatch({
      type: constant.ADD_ALBUM,
      value: true,
   })
}

const cancelAddAlbum = () => {
   store.dispatch({
      type: constant.ADD_ALBUM,
      value: false,
   })
}

export const ggCommon = {
   deepClone,
   removeObj,
   sortListObj,
   checkIncludes,
   setRegionData,
   setAddPost,
   cancelAddPost,
   setAddAlbum,
   cancelAddAlbum,
   closeModal,
}