const TOKEN_VARIABLE_NAME = 'mapToken';
const TOKEN_HEADER_KEY = 'Authorization';
const ROLE_ADMIN = 'ADMIN';
const ROLE_USER = 'USER';

// route
const ROUTE_HOME = '/';
const ROUTE_SAVE = '/save';
const ROUTE_EXPLORE = '/explore';
const ROUTE_ABOUT = '/about';
const ROUTE_ADVENTURE = '/adventure';
const ROUTE_ADMIN_DASHBOARD = '/admin/dashboard';
const ROUTE_ADMIN_USERS = '/admin/users';
const ROUTE_ADMIN_USER_DETAIL = '/admin/user/:uid';
const ROUTE_ADMIN_USER_POSTS = '/admin/user/:userid/posts';
const ROUTE_ADMIN_USER_VIDEOS = '/admin/user/:userid/videos';
const ROUTE_ADMIN_USER_ALBUMS = '/admin/user/:userid/albums';
const ROUTE_ADMIN_REGIONS = '/admin/regions';
const ROUTE_ADMIN_REGION_DETAIL = '/admin/region/:uid';
const ROUTE_ADMIN_REGION_PLACES = '/admin/region/:regionid/places';
const ROUTE_ADMIN_REGION_PLACE_DETAIL = '/admin/region/:regionid/place/:uid';
const ROUTE_ADMIN_ADD_PLACE = '/admin/addPlace';
const HASH_EXPLORE = '#/explore';

// color
const PLACE_NORMAL_COLOR = '#000000bd'
const PLACE_SELECTED_COLOR = '#236292'
const PLACE_MARKED_COLOR = '#c60808'
const REGION_NORMAL_COLOR = '#CCD8DE'
const REGION_MARKED_30_COLOR = '#5BB7D4'
const REGION_MARKED_80_COLOR = '#016699'
const REGION_MARKED_100_COLOR = '#00CE7D'

// for TOAST
const TOAST_TYPE_ERROR = 'ERROR';
const TOAST_TYPE_SUCCESS = 'SUCCESS';
const TOAST_TYPE_INFO = 'INFO';

// Message to notification
const ERROR_SERVER_BAD_RESPONSE = 'Error! Bad response from server!';

// for actions in Store
const SET_REGION_DATA = 'SET_REGION_DATA';
const SET_SELECTED_REGION = 'SET_SELECTED_REGION';
const SET_SELECTED_PLACE = 'SET_SELECTED_PLACE';
const ADD_POST = 'ADD_POST';
const ADD_ALBUM = 'ADD_ALBUM';
const RELOAD_MAP = 'RELOAD_MAP';

// API Key
const API_KEY = "AIzaSyCHvJsTg4ij3Nl7ral9QcYSxy4UeJxSrzw";

// proxyUrl
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

// Google API
const GG_API= "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=";
const GG_GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode/json?"

// Rating
const ONE_START = "Không thích";
const TWO_START = "Tạm được";
const THREE_START = "Bình thường";
const FOUR_START = "Rất đẹp";
const FIVE_START = "Tuyệt vời";

export const constant = {
   TOKEN_VARIABLE_NAME,
   TOKEN_HEADER_KEY,
   ROLE_ADMIN,
   ROLE_USER,

   ROUTE_HOME,
   ROUTE_SAVE,
   ROUTE_EXPLORE,
   ROUTE_ABOUT,
   ROUTE_ADVENTURE,
   ROUTE_ADMIN_DASHBOARD,
   ROUTE_ADMIN_USERS,
   ROUTE_ADMIN_USER_DETAIL,
   ROUTE_ADMIN_USER_POSTS,
   ROUTE_ADMIN_USER_VIDEOS,
   ROUTE_ADMIN_USER_ALBUMS,
   ROUTE_ADMIN_REGIONS,
   ROUTE_ADMIN_REGION_DETAIL,
   ROUTE_ADMIN_REGION_PLACES,
   ROUTE_ADMIN_REGION_PLACE_DETAIL,
   ROUTE_ADMIN_ADD_PLACE,
   HASH_EXPLORE,

   PLACE_NORMAL_COLOR,
   PLACE_SELECTED_COLOR,
   PLACE_MARKED_COLOR,
   REGION_NORMAL_COLOR,
   REGION_MARKED_30_COLOR,
   REGION_MARKED_80_COLOR,
   REGION_MARKED_100_COLOR,

   TOAST_TYPE_ERROR,
   TOAST_TYPE_SUCCESS,
   TOAST_TYPE_INFO,

   ERROR_SERVER_BAD_RESPONSE,

   SET_REGION_DATA,
   SET_SELECTED_REGION,
   SET_SELECTED_PLACE,
   ADD_POST,
   ADD_ALBUM,
   RELOAD_MAP,

   API_KEY,
   PROXY_URL,
   GG_API,
   GG_GEOCODE_API,

   ONE_START,
   TWO_START,
   THREE_START,
   FOUR_START,
   FIVE_START
}