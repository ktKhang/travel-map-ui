import { constant } from "../../utils/Constant";

const initialState = {
   selectedPlace: null
}
export const placeReducer = (state = initialState, action) => {
   switch (action.type) {
      case constant.SET_SELECTED_PLACE:
         return { ...state, selectedPlace: action.selectedPlace }
      default:
         return state
   }
}