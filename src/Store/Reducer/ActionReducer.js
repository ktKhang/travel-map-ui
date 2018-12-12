import { MethodUtil } from '../../utils/MethodUtil';

const initialState = {
   addPost: false,
   addAlbum: false,
}
export const actionReducer = (state = initialState, action) => {
   switch (action.type) {
      case "ADD_POST":
         return { ...state, addPost: action.value }
      case "ADD_ALBUM":
         return { ...state, addAlbum: action.value }
      default:
         return state
   }
}
