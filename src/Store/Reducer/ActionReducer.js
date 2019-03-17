import { constant } from "../../utils/Constant";

const initialState = {
   addPost: false,
   addAlbum: false,
}
export const actionReducer = (state = initialState, action) => {
   switch (action.type) {
      case constant.ADD_POST:
         if (action.value) {
            return {
               ...state,
               addPost: action.value,
               addAlbum: false,
            }
         } else {
            return {
               ...state,
               addPost: action.value,
            }
         }
      case constant.ADD_ALBUM:
         if (action.value) {
            return {
               ...state,
               addPost: false,
               addAlbum: action.value,
            }
         } else {
            return {
               ...state,
               addAlbum: action.value,
            }
         }
      default:
         return state
   }
}
