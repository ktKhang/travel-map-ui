const API_URL = 'http://localhost:8080';

// Declare all urls here
const LOGIN_URL = API_URL + '/auth/login'
const USER_DETAIL_URL = uid => {
   return API_URL + '/users/show/' + uid
}
const REGION_LIST_URL = API_URL + '/regions/all';
const PLACE_LIST_URL = API_URL + '/place/all';
const PLACE_DETAIL_URL = uid => {
   return API_URL + '/places/findByUid/' + uid;
}
const PLACE_FIND_BY_REGION_URL = regionUid => {
   return API_URL + '/places/findByRegionUid/' + regionUid
}
const PLACE_UPDATE_URL = API_URL + '/places/update';
const REGION_DETAIL_URL = uid => {
   return API_URL + '/regions/findByUid/' + uid;
}
const USER_LIST_URL = API_URL + '/users/all';
const REGION_DETAIL_ID_URL = id => {
   return API_URL + '/regions/findById/' + id;
}
const ADD_PLACE_URL = API_URL + '/places/create';

const USER_REGION_LIST_URL = userUid => {
   return API_URL + '/regions/findAllByUser/' + userUid
}
const REGION_ADD_POST_URL = API_URL + '/userRegion/addPost'
const PLACE_ADD_POST_URL = API_URL + '/placeUser/addPost'
const POST_LIST_URL = userUid => {
   return API_URL + '/users/findPostByUser/' + userUid;
}
const LOGIN_ADMIN_URL = API_URL + '/auth/admin/login'
const DELETE_USER_URL = userUid =>{
   return API_URL + '/users/delete/' + userUid;
}
const GET_FEELING_PLACE = placeUid => {
   return API_URL + '/feelings/findFeeling/' + placeUid;
}

const DELETE_FEELING_URL = postUid => {
   return API_URL + '/feelings/deleteFeeling/' + postUid;
}

const ALBUM_LIST_URL = userUid => {
   return API_URL + '/users/getAlbums/' + userUid;
}

const DELETE_ALBUM_URL = albumUid => {
   return API_URL + '/albums/deleteAlbum/' + albumUid;
}

const DELETE_PLACE_URL = placeUid => {
   return API_URL + '/places/deletePlace/' + placeUid;
}

export const API_CONST = {
   API_URL,
   LOGIN_URL,
   USER_DETAIL_URL,
   REGION_LIST_URL,
   PLACE_LIST_URL,
   PLACE_DETAIL_URL,
   PLACE_FIND_BY_REGION_URL,
   PLACE_UPDATE_URL,
   REGION_DETAIL_URL,
   USER_LIST_URL,
   REGION_DETAIL_ID_URL,
   ADD_PLACE_URL,
   USER_REGION_LIST_URL,
   REGION_ADD_POST_URL,
   PLACE_ADD_POST_URL,
   POST_LIST_URL,
   LOGIN_ADMIN_URL,
   DELETE_USER_URL,
   GET_FEELING_PLACE,
   DELETE_FEELING_URL,
   ALBUM_LIST_URL,
   DELETE_ALBUM_URL,
   DELETE_PLACE_URL
};